import { NextResponse } from "next/server";
import { healthReportSchema } from "@/lib/analysis/schema";
import {
  answerIsCorrect,
  challengeDifficultySchema,
  challengeQuestionSchema,
  publicQuestion,
  questionForFinding,
} from "@/lib/garden/challenges";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { sampleSeasons } from "@/lib/garden/seasons";
import { z } from "zod";

export const runtime = "nodejs";

const requestSchema = z.object({
  report: healthReportSchema,
  findingId: z.string().min(1),
  difficulty: challengeDifficultySchema,
  attemptId: z.string().min(1).optional(),
  answer: z.string().max(500).optional(),
});

const ATTEMPT_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 100;
type Attempt = {
  question: z.infer<typeof challengeQuestionSchema>;
  expiresAt: number;
};
const attempts = new Map<string, Attempt>();
const proofs = new Map<
  string,
  { findingId: string; reportHash: string; expiresAt: number }
>();

const sampleReports = [
  sampleHealthReport,
  ...sampleSeasons(sampleHealthReport)
    .slice(1)
    .map((season) => season.report),
];

function isSampleReport(report: z.infer<typeof healthReportSchema>) {
  return sampleReports.some(
    (sample) => JSON.stringify(report) === JSON.stringify(sample),
  );
}

function prune(now = Date.now()) {
  for (const [id, attempt] of attempts) {
    if (attempt.expiresAt <= now) attempts.delete(id);
  }
  for (const [id, proof] of proofs) {
    if (proof.expiresAt <= now) proofs.delete(id);
  }
}

export function resetChallengeRegistry() {
  attempts.clear();
  proofs.clear();
}

export function consumeChallengeProof(
  proof: string,
  findingId: string,
  reportHash: string,
) {
  prune();
  const entry = proofs.get(proof);
  if (
    !entry ||
    entry.findingId !== findingId ||
    entry.reportHash !== reportHash
  )
    return false;
  proofs.delete(proof);
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "A valid challenge request is required" },
      { status: 400 },
    );
  if (!isSampleReport(parsed.data.report))
    return NextResponse.json(
      { error: "Learning challenges are available in sample mode only" },
      { status: 403 },
    );

  prune();
  if (!parsed.data.attemptId) {
    const question = questionForFinding(
      parsed.data.report,
      parsed.data.findingId,
      parsed.data.difficulty,
    );
    if (!question)
      return NextResponse.json(
        { error: "Finding cannot be challenged" },
        { status: 404 },
      );
    if (attempts.size >= MAX_ATTEMPTS) {
      const oldest = attempts.keys().next().value;
      if (oldest) attempts.delete(oldest);
    }
    const attemptId = crypto.randomUUID();
    attempts.set(attemptId, {
      question,
      expiresAt: Date.now() + ATTEMPT_TTL_MS,
    });
    return NextResponse.json({ attemptId, question: publicQuestion(question) });
  }

  const attempt = attempts.get(parsed.data.attemptId);
  if (!attempt)
    return NextResponse.json(
      { error: "Challenge expired; start again" },
      { status: 409 },
    );
  if (parsed.data.answer === undefined)
    return NextResponse.json(
      { error: "An answer is required" },
      { status: 400 },
    );
  if (!answerIsCorrect(attempt.question, parsed.data.answer))
    return NextResponse.json(
      {
        correct: false,
        feedback: "Not quite. Use the evidence and try again.",
        hint: attempt.question.hint,
      },
      { status: 422 },
    );
  attempts.delete(parsed.data.attemptId);
  const proof = `proof-${crypto.randomUUID()}`;
  proofs.set(proof, {
    findingId: attempt.question.findingId,
    reportHash: parsed.data.report.reportHash,
    expiresAt: Date.now() + ATTEMPT_TTL_MS,
  });
  return NextResponse.json({
    correct: true,
    proof,
    findingId: attempt.question.findingId,
  });
}
