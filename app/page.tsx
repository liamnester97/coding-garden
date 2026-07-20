"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { explainNode, type GardenExplanation } from "@/lib/garden/explanation";
import { healthMetaphor } from "@/lib/garden/metaphor";
import { projectHealthReport } from "@/lib/garden/project";
import type { ToolCommand } from "@/lib/garden/command";
import { plantVoice, sampleSeasons } from "@/lib/garden/seasons";
import type {
  PublicChallengeQuestion,
  ChallengeDifficulty,
} from "@/lib/garden/challenges";
import {
  gardenerStart,
  isNearWorldPoint,
  moveGardenerWithFacing,
  type Facing,
  type WorldPoint,
} from "@/lib/garden/world";
import {
  authoredGardenDecorations,
  spritePosition,
  type PixelSpriteId,
} from "@/lib/garden/assets";
import { authoredGardenMap } from "@/lib/garden/map";
import {
  demoTeachingReport,
  teachingLessonForGradeBand,
  teachingLessons,
  type TeachingLesson,
} from "@/content/teaching-lessons";
import { activeQuestionIdsForDifficulty } from "@/content/teaching-questions";
import { teachingReportForLesson } from "@/lib/garden/demo-reports";
import {
  advanceGoldenPath,
  goldenPathSteps,
  initialGoldenPathState,
} from "@/lib/garden/golden-path";

function spriteStyle(
  sprite: PixelSpriteId,
  x: number,
  y: number,
  size: "small" | "medium" | "large" | "plant" | "avatar" = "medium",
): CSSProperties {
  return {
    ...spritePosition(sprite),
    left: `${x}%`,
    top: `${y}%`,
    ...(size === "small"
      ? { width: "10%", paddingBottom: "10%" }
      : size === "large"
        ? { width: "22%", paddingBottom: "22%" }
        : size === "plant"
          ? { width: "11%", paddingBottom: "11%" }
          : size === "avatar"
            ? { width: "12%", paddingBottom: "12%" }
            : { width: "16%", paddingBottom: "16%" }),
  };
}

export default function HomePage() {
  const [report, setReport] = useState(demoTeachingReport);
  const [repositoryUrl, setRepositoryUrl] = useState(
    "https://github.com/ColorlibHQ/gentelella",
  );
  const [source, setSource] = useState<"sample" | "report">("sample");
  const [requestState, setRequestState] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<GardenExplanation | null>(
    null,
  );
  const [command, setCommand] = useState<ToolCommand | null>(null);
  const [pendingFinding, setPendingFinding] = useState<
    (typeof report.findings)[number] | null
  >(null);
  const [tendError, setTendError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<{
    attemptId: string;
    question: PublicChallengeQuestion;
    proof?: string;
  } | null>(null);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [challengeDifficulty, setChallengeDifficulty] =
    useState<ChallengeDifficulty>("easy");
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(
    null,
  );
  const [showExplanationReview, setShowExplanationReview] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [scaffoldLevel, setScaffoldLevel] = useState(0);
  const [learnerBand, setLearnerBand] = useState<
    "younger" | "middle" | "older"
  >("younger");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const challengeAnswerRef = useRef<HTMLInputElement>(null);
  const gameSurfaceRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gardener, setGardener] = useState<WorldPoint>(gardenerStart);
  const [gardenerFacing, setGardenerFacing] = useState<Facing>("down");
  const [interactionMessage, setInteractionMessage] = useState<string | null>(
    null,
  );
  const [dialogueExpanded, setDialogueExpanded] = useState(false);
  const [goldenPath, setGoldenPath] = useState(initialGoldenPathState);
  const [completedCommands, setCompletedCommands] = useState<ToolCommand[]>([]);
  const [showApplyReview, setShowApplyReview] = useState(false);
  const [reflectionNote, setReflectionNote] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [lessonId, setLessonId] = useState<"sample" | TeachingLesson["id"]>(
    "demo-garden",
  );
  const [completionFixes, setCompletionFixes] = useState<
    PublicChallengeQuestion[]
  >([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [activeQuestionIds, setActiveQuestionIds] = useState(() =>
    activeQuestionIdsForDifficulty("easy"),
  );
  const [journalEntries, setJournalEntries] = useState<string[]>([
    "You entered the garden. Walk to the golden glow to begin.",
  ]);
  const [seasonId, setSeasonId] = useState("early-spring");
  const activeLessonReport = teachingReportForLesson(lessonId);
  const seasons = sampleSeasons(activeLessonReport);
  const currentSeason =
    seasons.find((season) => season.id === seasonId) ?? seasons[0];
  const currentLesson =
    lessonId === "sample"
      ? {
          title: "Five friendly code plants",
          learningObjective:
            "Notice, explain, and safely improve five small code problems in any order.",
        }
      : (teachingLessons.find((lesson) => lesson.id === lessonId) ??
        teachingLessonForGradeBand(
          learnerBand === "younger"
            ? "grades-1-5"
            : learnerBand === "middle"
              ? "grades-6-8"
              : "grades-9-12",
        ));
  const scene = projectHealthReport(report);
  const solids = authoredGardenMap.solids;
  const completedFindingIds = new Set(
    completionFixes.map((fix) => fix.findingId),
  );
  const completedNodeIds = new Set(completionFixes.map((fix) => fix.nodeId));
  const unfinishedPlants = scene.plants.filter(
    (plant) =>
      !completedNodeIds.has(plant.id) &&
      activeQuestionIds.some(
        (findingId) =>
          report.findings.find((finding) => finding.id === findingId)
            ?.nodeId === plant.id,
      ),
  );
  const [selectedId, setSelectedId] = useState(scene.plants[0]?.id);
  const selectedPlant = scene.plants.find((plant) => plant.id === selectedId);
  const nearbyPlant = scene.plants
    .filter(
      (plant) =>
        !completedNodeIds.has(plant.id) &&
        activeQuestionIds.some(
          (findingId) =>
            report.findings.find((finding) => finding.id === findingId)
              ?.nodeId === plant.id,
        ),
    )
    .filter((plant) => isNearWorldPoint(gardener, plant, 10))
    .sort(
      (left, right) =>
        Math.hypot(gardener.x - left.x, gardener.y - left.y) -
        Math.hypot(gardener.x - right.x, gardener.y - right.y),
    )[0];
  const nearbyZone = authoredGardenMap.zones.find((zone) => {
    if (zone.id !== "learning" && zone.id !== "payoff") return false;
    return isNearWorldPoint(
      gardener,
      { x: zone.x + zone.width / 2, y: zone.y + zone.height / 2 },
      18,
    );
  });
  const cameraStyle = {
    "--camera-x": `${gardener.x}%`,
    "--camera-y": `${gardener.y}%`,
  } as CSSProperties;
  const modeLabel = source === "sample" ? "sample mode" : "public report";
  const visibleExplanation =
    explanation?.nodeId === selectedId
      ? explanation
      : selectedPlant
        ? explainNode(report, selectedPlant.id, source)
        : null;
  const nextUnfinishedPlant = unfinishedPlants[0];
  const nextTarget = nextUnfinishedPlant
    ? {
        x: nextUnfinishedPlant.x,
        y: nextUnfinishedPlant.y,
        label: nextUnfinishedPlant.path,
        isPlant: true,
      }
    : goldenPath.reflected
      ? { x: 38, y: 86, label: "Reflection bench", isPlant: false }
      : selectedPlant
        ? {
            x: selectedPlant.x,
            y: selectedPlant.y,
            label: selectedPlant.path,
            isPlant: false,
          }
        : { x: 50, y: 43, label: "Main garden walk", isPlant: false };
  const nextTargetLabel =
    source === "report" ? "Inspect a public-report plant" : nextTarget.label;
  function recordJournalEntry(entry: string) {
    setJournalEntries((current) =>
      current.includes(entry) ? current : [...current, entry].slice(-6),
    );
  }

  function resetSampleLesson() {
    setLessonId("sample");
    setReport(demoTeachingReport);
    setSource("sample");
    setRepositoryUrl("https://github.com/ColorlibHQ/gentelella");
    setRequestState("idle");
    setError(null);
    setExplanation(null);
    setCommand(null);
    setPendingFinding(null);
    setTendError(null);
    setChallenge(null);
    setChallengeAnswer("");
    setChallengeFeedback(null);
    setShowExplanationReview(false);
    setShowHint(false);
    setScaffoldLevel(0);
    setLearnerBand("younger");
    setGardener(gardenerStart);
    setGardenerFacing("down");
    setInteractionMessage("Lesson reset. Walk to the golden glow to begin.");
    setDialogueExpanded(false);
    setGoldenPath(initialGoldenPathState());
    setCompletedCommands([]);
    setShowApplyReview(false);
    setReflectionNote("");
    setReflectionSaved(false);
    setJournalEntries([
      "You entered the garden. Walk to the golden glow to begin.",
    ]);
    setSeasonId("early-spring");
    setChallengeDifficulty("easy");
    setCompletionFixes([]);
    setActiveQuestionIds(activeQuestionIdsForDifficulty("easy"));
    setShowCompletion(false);
    setSelectedId(demoTeachingReport.nodes[0]?.id);
    setShowHelp(false);
  }

  function selectTeachingLesson(nextLessonId: "sample" | TeachingLesson["id"]) {
    const nextReport = teachingReportForLesson(nextLessonId);
    const nextLesson = teachingLessons.find(
      (lesson) => lesson.id === nextLessonId,
    );
    setLessonId(nextLessonId);
    setReport(nextReport);
    setSource("sample");
    setPendingFinding(null);
    setChallenge(null);
    setChallengeAnswer("");
    setChallengeFeedback(null);
    setShowExplanationReview(false);
    setShowHint(false);
    setScaffoldLevel(0);
    setCommand(null);
    setTendError(null);
    setCompletedCommands([]);
    setCompletionFixes([]);
    setActiveQuestionIds(activeQuestionIdsForDifficulty("easy"));
    setShowCompletion(false);
    setShowApplyReview(false);
    setReflectionNote("");
    setReflectionSaved(false);
    setGoldenPath(initialGoldenPathState());
    setSelectedId(nextReport.nodes[0]?.id);
    setChallengeDifficulty(
      nextLesson?.gradeBand === "grades-9-12"
        ? "hard"
        : nextLesson?.gradeBand === "grades-6-8"
          ? "medium"
          : "easy",
    );
    setInteractionMessage(
      nextLesson
        ? `${nextLesson.title} loaded. Walk to a glowing plant and press E to begin.`
        : "Sample lesson loaded. Walk to a glowing plant and press E to begin.",
    );
    setDialogueExpanded(false);
  }
  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    void fetch("/api/explain", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nodeId: selectedId, report }),
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as GardenExplanation;
      })
      .then((nextExplanation) => {
        if (!cancelled && nextExplanation) setExplanation(nextExplanation);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [report, selectedId, source]);
  useEffect(() => {
    const updateFullscreen = () =>
      setIsFullscreen(document.fullscreenElement === gameSurfaceRef.current);
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);
  useEffect(() => {
    if (!challenge || !pendingFinding) return;
    const frame = requestAnimationFrame(() => {
      challengeAnswerRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [challenge, pendingFinding]);
  const healthCounts = scene.plants.reduce(
    (counts, plant) => {
      counts[plant.health] += 1;
      return counts;
    },
    { healthy: 0, stressed: 0, withered: 0 },
  );

  async function analyzeRepository(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestState("loading");
    setError(null);
    try {
      const response = await fetch("/api/repository/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: repositoryUrl }),
      });
      const payload = (await response.json()) as {
        report?: typeof sampleHealthReport;
        error?: string;
      };
      if (!response.ok || !payload.report)
        throw new Error(payload.error ?? "Repository analysis failed");
      setReport(payload.report);
      setSource("report");
      setSelectedId(payload.report.nodes[0]?.id);
      setGoldenPath(initialGoldenPathState());
      setRequestState("idle");
    } catch (caught) {
      setRequestState("error");
      setError(caught instanceof Error ? caught.message : "Analysis failed");
    }
  }

  function requestTending(finding: (typeof report.findings)[number]) {
    if (source !== "sample") {
      setTendError(
        "Public reports are read-only; demo tending is sample-only.",
      );
      return;
    }
    setTendError(null);
    setPendingFinding(finding);
    setChallenge(null);
    setChallengeAnswer("");
    setChallengeFeedback(null);
    setShowExplanationReview(false);
    setShowHint(false);
    setScaffoldLevel(0);
    setGoldenPath((current) => advanceGoldenPath(current, "inspected"));
    recordJournalEntry(
      `You inspected ${finding.nodeId} and opened a learning question.`,
    );
    void startChallenge(finding, challengeDifficulty);
  }

  function movePlayer(direction: string) {
    const next = moveGardenerWithFacing(
      gardener,
      gardenerFacing,
      direction,
      solids,
    );
    setGardener(next.point);
    setGardenerFacing(next.facing);
    setInteractionMessage(null);
    setDialogueExpanded(false);
    if (next.moved) {
      setGoldenPath((current) => advanceGoldenPath(current, "explored"));
      recordJournalEntry("You explored a new part of the garden.");
    }
  }

  function interactNearby() {
    if (nearbyPlant) {
      setSelectedId(nearbyPlant.id);
      const nearbyFinding = report.findings.find(
        (finding) =>
          finding.nodeId === nearbyPlant.id &&
          (activeQuestionIds.includes(finding.id) ||
            finding.id.startsWith(`py-${challengeDifficulty}`)) &&
          !completedFindingIds.has(finding.id),
      );
      if (!nearbyFinding) {
        setInteractionMessage(
          `${nearbyPlant.path} is blooming. Choose another golden plant to keep learning.`,
        );
        return;
      }
      if (!dialogueExpanded) {
        setDialogueExpanded(true);
        setInteractionMessage(
          `${nearbyPlant.path} needs tending. Solve the problem to help this plant bloom. Press E or Enter again to open the question.`,
        );
        return;
      }
      setGoldenPath((current) => advanceGoldenPath(current, "inspected"));
      const finding = report.findings.find(
        (candidate) =>
          candidate.nodeId === nearbyPlant.id &&
          (activeQuestionIds.includes(candidate.id) ||
            candidate.id.startsWith(`py-${challengeDifficulty}`)) &&
          (candidate.type === "dead-code" ||
            candidate.type === "coverage-gap" ||
            candidate.type === "vulnerability"),
      );
      if (source === "sample" && finding) {
        requestTending(finding);
        return;
      }
      setInteractionMessage(
        `Inspecting ${nearbyPlant.path}. Read the evidence before choosing a tool.`,
      );
      return;
    }
    if (nearbyZone?.id === "learning") {
      setDialogueExpanded(false);
      setInteractionMessage(
        "Learning greenhouse: move near a plant, then press Inspect nearby.",
      );
      return;
    }
    if (nearbyZone?.id === "payoff") {
      setDialogueExpanded(false);
      setInteractionMessage(
        "Reflection bench: this is where the before-and-after learning recap appears.",
      );
      return;
    }
    setDialogueExpanded(false);
    setInteractionMessage(
      "Nothing is close enough yet. Walk toward a glowing plant, greenhouse, or bench.",
    );
  }

  async function startChallenge(
    finding: (typeof report.findings)[number],
    difficulty: ChallengeDifficulty,
  ) {
    try {
      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ report, findingId: finding.id, difficulty }),
      });
      const payload = (await response.json()) as {
        attemptId?: string;
        question?: PublicChallengeQuestion;
        error?: string;
      };
      if (!response.ok || !payload.attemptId || !payload.question)
        throw new Error(
          payload.error ?? "Could not start the learning challenge",
        );
      setChallenge({
        attemptId: payload.attemptId,
        question: payload.question,
      });
      setScaffoldLevel(0);
    } catch (caught) {
      setTendError(
        caught instanceof Error ? caught.message : "Challenge could not start",
      );
    }
  }

  async function submitChallenge() {
    if (!challenge) return;
    try {
      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          report,
          findingId: challenge.question.findingId,
          difficulty: challenge.question.difficulty,
          attemptId: challenge.attemptId,
          answer: challengeAnswer,
        }),
      });
      const payload = (await response.json()) as {
        correct?: boolean;
        proof?: string;
        feedback?: string;
        hint?: string;
        explanation?: string;
        error?: string;
      };
      if (payload.correct && payload.proof) {
        setChallenge((current) =>
          current ? { ...current, proof: payload.proof } : current,
        );
        setChallengeFeedback(
          "Correct. Review the proposed scope before starting the rehearsal.",
        );
        setGoldenPath((current) => advanceGoldenPath(current, "answered"));
        recordJournalEntry(
          "You explained the finding correctly and unlocked the tool rehearsal.",
        );
      } else {
        setChallengeFeedback(
          payload.feedback || payload.error || "Not quite. Try another choice.",
        );
        setChallengeAnswer("");
      }
    } catch (caught) {
      setChallengeFeedback(
        caught instanceof Error
          ? caught.message
          : "Answer could not be checked",
      );
    }
  }

  async function tendFinding(finding: (typeof report.findings)[number]) {
    const tool =
      finding.type === "dead-code"
        ? "clippers"
        : finding.type === "coverage-gap"
          ? "watering-can"
          : finding.type === "vulnerability"
            ? "pesticide"
            : finding.type === "logic-bug" ||
                finding.type === "missing-function"
              ? "watering-can"
              : "clippers";
    if (!tool) return;
    setTendError(null);
    const seed = {
      id: `${tool}-${finding.id}`,
      tool,
      findingId: finding.id,
      nodeId: finding.nodeId,
    } as const;
    if (!challenge?.proof) {
      setTendError(
        "Answer the learning challenge before starting the rehearsal.",
      );
      return;
    }
    let currentCommand: ToolCommand | null = null;
    let commandToken: string | null = null;
    let currentReport = report;
    let firstRequest = true;
    try {
      setGoldenPath((current) => advanceGoldenPath(current, "confirmed"));
      while (!currentCommand || currentCommand.state !== "landed") {
        const response = await fetch("/api/tend", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            report: currentReport,
            command: firstRequest ? seed : currentCommand,
            commandToken: firstRequest ? undefined : commandToken,
            proof: firstRequest ? challenge.proof : undefined,
            action: "advance",
          }),
        });
        const payload = (await response.json()) as {
          command?: ToolCommand;
          commandToken?: string;
          report?: typeof report;
          error?: string;
        };
        if (!response.ok || !payload.command || !payload.report)
          throw new Error(payload.error ?? "Tending failed");
        currentCommand = payload.command;
        commandToken = payload.commandToken ?? commandToken;
        currentReport = payload.report;
        firstRequest = false;
        setCommand(currentCommand);
        if (currentCommand.state === "acting") {
          setGoldenPath((current) => advanceGoldenPath(current, "rehearsed"));
        }
      }
      setReport(currentReport);
      setGoldenPath((current) => advanceGoldenPath(current, "reanalyzed"));
      recordJournalEntry(
        `The garden was re-analyzed after the ${tool} rehearsal.`,
      );
      setSource("sample");
      setSelectedId(finding.nodeId);
      if (currentCommand)
        setCompletedCommands((completed) => [...completed, currentCommand!]);
      setCompletionFixes((current) =>
        current.some((item) => item.findingId === challenge.question.findingId)
          ? current
          : [...current, challenge.question],
      );
      const nextCompletionFixes = completionFixes.some(
        (item) => item.findingId === challenge.question.findingId,
      )
        ? completionFixes
        : [...completionFixes, challenge.question];
      if (nextCompletionFixes.length >= 5) setShowCompletion(true);
      setGoldenPath((current) => advanceGoldenPath(current, "reflected"));
      setReflectionSaved(false);
      setPendingFinding(null);
      setChallenge(null);
    } catch (caught) {
      setTendError(caught instanceof Error ? caught.message : "Tending failed");
      setCommand(
        currentCommand ? { ...currentCommand, state: "failed" } : null,
      );
    }
  }

  const actionStage =
    source === "report"
      ? {
          label: "Read-only inspection",
          detail:
            "Explore and inspect evidence; no tools can change this report.",
        }
      : command?.state === "acting"
        ? {
            label: "Rehearsal running",
            detail:
              "The sample-only tool rehearsal is preparing a verification.",
          }
        : command?.state === "verifying"
          ? {
              label: "Re-analysis running",
              detail: "The garden is checking the bounded sample report again.",
            }
          : command?.state === "landed"
            ? {
                label: "Health change verified",
                detail:
                  "The garden changed only after the verified re-analysis.",
              }
            : challenge?.proof
              ? {
                  label: "Ready to confirm",
                  detail: "Your answer unlocked a proposed sample-only scope.",
                }
              : pendingFinding
                ? {
                    label: "Learning question",
                    detail:
                      "Read the evidence and answer before choosing a tool.",
                  }
                : {
                    label: "Explore and inspect",
                    detail: "Walk to a glowing plant, then press Enter or E.",
                  };

  function saveReflection() {
    const note = reflectionNote.trim();
    if (!note) return;
    setReflectionSaved(true);
    recordJournalEntry(`Reflection: ${note}`);
  }

  function correctedCopy() {
    return completionFixes
      .map((fix) => `# ${fix.findingId}\n${fix.afterCode}`)
      .join("\n\n");
  }

  async function copyCorrectedCode() {
    const copy = correctedCopy();
    if (copy) await navigator.clipboard?.writeText(copy);
  }

  function downloadCorrectedCode() {
    const blob = new Blob([correctedCopy()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lesson_garden_fixed.py";
    link.click();
    URL.revokeObjectURL(url);
  }

  function printCompletion() {
    window.print();
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await gameSurfaceRef.current?.requestFullscreen();
  }

  return (
    <main>
      <section className="garden" aria-labelledby="title">
        <span className="eyebrow">Code Garden · {modeLabel}</span>
        <h1 id="title">Code Garden: fix the plants, learn the code.</h1>
        <p>
          Start with the Python teaching garden. Five plants are waiting in any
          order. Walk close, press E or Enter, answer a short question, and
          watch the unhealthy plant bloom.
        </p>
        <span className="status">
          {scene.repoName} · {scene.plants.length} plants ·{" "}
          {scene.plants.reduce((sum, plant) => sum + plant.findingCount, 0)}{" "}
          findings
        </span>
        <form className="repository-form" onSubmit={analyzeRepository}>
          <label htmlFor="repository-url">
            Analyze a public GitHub repository
          </label>
          <div className="repository-form-row">
            <input
              id="repository-url"
              type="url"
              value={repositoryUrl}
              onChange={(event) => setRepositoryUrl(event.target.value)}
              placeholder="https://github.com/owner/repository"
              required
            />
            <button type="submit" disabled={requestState === "loading"}>
              {requestState === "loading" ? "Analyzing…" : "Grow this garden"}
            </button>
          </div>
          <small>
            Public, read-only analysis. Target code is not installed or
            executed.
          </small>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
        </form>
        <p className="report-source">
          {source === "sample"
            ? "Offline sample report · no credentials required"
            : `Public report · commit ${report.repo.commit.slice(0, 12)}`}
        </p>
        <div className="report-summary" aria-label="Garden health summary">
          {Object.entries(healthMetaphor).map(([state, metaphor]) => (
            <span key={state}>
              <i style={{ background: metaphor.color }} />
              <strong>
                {healthCounts[state as keyof typeof healthCounts]}
              </strong>{" "}
              {metaphor.label.toLowerCase()}
            </span>
          ))}
          <span>
            <strong>{report.findings.length}</strong> report findings
          </span>
        </div>
        <p className="report-methods">
          Signals: dead code {report.method.deadCode}, coverage{" "}
          {report.method.coverage}, complexity {report.method.complexity},
          vulnerabilities {report.method.vulnerabilities}.
        </p>
        {report.scope.kind === "bounded" ? (
          <p className="scope-notice" role="status">
            Bounded analysis: {report.scope.analyzedFiles} of{" "}
            {report.scope.supportedFiles} supported files analyzed;{" "}
            {report.scope.omittedFiles} omitted by the intake limits.
          </p>
        ) : null}
        <div
          className="game-toolbar"
          aria-label="Game controls and instructions"
        >
          <div>
            <span className="eyebrow">Garden controls</span>
            <strong>
              Arrow keys or WASD move · E interacts · H shows a clue
            </strong>
            <small>
              {currentLesson.title} · {currentLesson.learningObjective} · The
              recommended level changes the question depth, not the garden’s
              report truth.
            </small>
          </div>
          <div className="game-toolbar-actions">
            <label htmlFor="toolbar-lesson-select">Teaching demo</label>
            <select
              id="toolbar-lesson-select"
              value={lessonId}
              onChange={(event) =>
                selectTeachingLesson(
                  event.target.value as "sample" | TeachingLesson["id"],
                )
              }
              disabled={source !== "sample"}
            >
              <option value="sample">
                Python garden · five active questions
              </option>
              {teachingLessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.gradeBand} · {lesson.title}
                </option>
              ))}
            </select>
            <label htmlFor="toolbar-season-select">Level</label>
            <select
              id="toolbar-season-select"
              value={seasonId}
              disabled={source !== "sample"}
              onChange={(event) => {
                if (source !== "sample") return;
                const next = seasons.find(
                  (season) => season.id === event.target.value,
                );
                if (next) {
                  setSeasonId(next.id);
                  setReport(next.report);
                  setChallengeDifficulty(next.recommendedDifficulty);
                  setActiveQuestionIds(
                    activeQuestionIdsForDifficulty(next.recommendedDifficulty),
                  );
                  setPendingFinding(null);
                  setChallenge(null);
                  setSelectedId(next.report.nodes[0]?.id);
                  setGoldenPath(initialGoldenPathState());
                }
              }}
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.level === 1
                    ? "Sprout / Easy · Grades 1–5"
                    : season.level === 2
                      ? "Growing / Medium · Grades 6–8"
                      : "Master Gardener / Hard · Grades 9–12"}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowHelp((current) => !current)}
              aria-expanded={showHelp}
              aria-controls="map-help-panel"
            >
              {showHelp ? "Close help" : "Help"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => void toggleFullscreen()}
            >
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={resetSampleLesson}
            >
              Reset lesson
            </button>
          </div>
        </div>
        <div
          ref={gameSurfaceRef}
          className={`garden-stage season-${currentSeason.id}${challenge ? " challenge-open" : ""}`}
          aria-label="Code garden map"
        >
          <div
            className={`map-mode-banner ${source === "sample" ? "sample" : "public"}`}
            role="status"
          >
            <strong>
              {source === "sample" ? "Sample rehearsal" : "Public read-only"}
            </strong>
            <span>
              {source === "sample"
                ? "Practice safely: only verified sample re-analysis changes garden health."
                : "Explore and inspect only: the analyzed repository is never changed."}
            </span>
          </div>
          {showWelcome ? (
            <aside className="map-welcome" aria-label="First visit guide">
              <span className="eyebrow">First visit</span>
              <strong>Code Garden · Python demo</strong>
              <p>
                Start with Easy for Grades 1–5. Five plants are ready in any
                order.
              </p>
              <ol>
                <li>Use the arrow keys or WASD to walk.</li>
                <li>Follow the golden glow to a plant.</li>
                <li>Press Enter or E, then answer the question.</li>
              </ol>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowWelcome(false)}
              >
                Start Game
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowWelcome(false)}
              >
                Got it
              </button>
            </aside>
          ) : null}
          <div className="garden-camera-world" style={cameraStyle}>
            {unfinishedPlants.map((plant) => (
              <span
                className="map-target-halo"
                key={`halo-${plant.id}`}
                style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
                aria-hidden="true"
              />
            ))}
            <div className="garden-map-zones" aria-hidden="true">
              {authoredGardenMap.zones.map((zone) => (
                <span
                  className={`garden-map-zone ${zone.tone}`}
                  key={zone.id}
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.width}%`,
                    height: `${zone.height}%`,
                  }}
                />
              ))}
            </div>
            <div className="garden-ground" aria-hidden="true">
              <span
                className="pixel-sprite ground-grass"
                style={spriteStyle("grass", 0, 0, "large")}
              />
              <span
                className="pixel-sprite ground-soil"
                style={spriteStyle("soil", 25, 22, "large")}
              />
              <span
                className="pixel-sprite ground-path"
                style={spriteStyle("stone-path", 42, 38, "large")}
              />
              <span
                className="pixel-sprite ground-pond-edge"
                style={spriteStyle("pond-edge", 77, 4, "medium")}
              />
            </div>
            <div className="garden-decorations" aria-hidden="true">
              {authoredGardenDecorations.map((decoration) => (
                <span
                  className={`pixel-sprite decoration-${decoration.size}`}
                  key={decoration.id}
                  style={spriteStyle(
                    decoration.sprite,
                    decoration.x,
                    decoration.y,
                    decoration.size,
                  )}
                />
              ))}
            </div>
            <svg
              viewBox={authoredGardenMap.viewBox}
              role="img"
              aria-label={`${scene.repoName} module map with ${scene.plants.length} plants and ${scene.roots.length} roots`}
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  [
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                    "w",
                    "a",
                    "s",
                    "d",
                  ].includes(event.key)
                ) {
                  event.preventDefault();
                  movePlayer(event.key);
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  interactNearby();
                } else if (event.key.toLowerCase() === "e") {
                  event.preventDefault();
                  interactNearby();
                }
              }}
            >
              <g className="roots" aria-hidden="true">
                {authoredGardenMap.paths.map((path) => (
                  <polyline
                    className="authored-map-path guided"
                    key={path.id}
                    points={path.points}
                  />
                ))}
                {scene.roots.map((root, index) => (
                  <line
                    key={`${root.from}\0${root.to}\0${index}`}
                    x1={root.x1}
                    y1={root.y1}
                    x2={root.x2}
                    y2={root.y2}
                  />
                ))}
              </g>
            </svg>
            <div className="garden-sprites" aria-hidden="true">
              {scene.plants.map((plant) => (
                <span
                  className={`pixel-sprite plant-sprite ${plant.health} target-${plant.targetCategory}`}
                  key={plant.id}
                  style={spriteStyle(
                    plant.sprite,
                    plant.x - 5.5,
                    plant.y - 5.5,
                    "plant",
                  )}
                />
              ))}
              <span
                className="pixel-sprite gardener-sprite"
                style={spriteStyle(
                  `gardener-${gardenerFacing}` as PixelSpriteId,
                  gardener.x - 6,
                  gardener.y - 6,
                  "avatar",
                )}
              />
            </div>
            <div className="map-plants" aria-label="Plants in the garden">
              {scene.plants.map((plant, index) => (
                <button
                  key={plant.id}
                  type="button"
                  className={`map-plant-button ${plant.health} target-${plant.targetCategory} ${completedNodeIds.has(plant.id) ? "completed" : ""} ${plant.id === selectedId ? "selected" : ""}`}
                  style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
                  aria-label={`Inspect plant ${index + 1}`}
                  title={plant.path}
                  aria-pressed={plant.id === selectedId}
                  onClick={() => {
                    setSelectedId(plant.id);
                  }}
                >
                  <span
                    className="pixel-sprite map-plant-sprite"
                    style={spriteStyle(plant.sprite, 50, 50, "plant")}
                  />
                  {!completedNodeIds.has(plant.id) ? (
                    <span className="target-bubble" aria-hidden="true">
                      I need a fix!
                      <br />
                      Press E to solve the problem.
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
          <div className="map-hud" aria-label="Garden game controls">
            <div className="map-hud-title">
              <strong>Next: {nextTargetLabel}</strong>
              <small>Walk to the golden glow, then press Enter or E</small>
            </div>
            <div className="map-tool-inventory" aria-label="Garden tools">
              <span className="eyebrow">Tool ready</span>
              <span>
                {nearbyPlant && source === "sample"
                  ? nearbyPlant.findings.some(
                      (finding) => finding.label === "Dead code",
                    )
                    ? "✂ Clippers"
                    : nearbyPlant.findings.some(
                          (finding) => finding.label === "Coverage gap",
                        )
                      ? "◒ Watering Can"
                      : "Magnifying Glass"
                  : "Magnifying Glass for inspection"}
              </span>
              <small>
                Tools appear here when the code gives you a reason to use them.
              </small>
            </div>
            <div
              className="map-dialogue"
              aria-live="polite"
              aria-label="Garden dialogue"
            >
              <span className="eyebrow">Garden dialogue</span>
              <strong>
                {interactionMessage ??
                  "The garden is ready. Walk toward a glowing plant."}
              </strong>
              <small>
                {nearbyPlant
                  ? dialogueExpanded
                    ? "Press E or Enter again to open the full question."
                    : `Nearby: ${nearbyPlant.path} · press E or Enter to talk to this plant.`
                  : "Your next clue and question will appear here."}
              </small>
            </div>
            <div
              className="map-action-staging"
              aria-live="polite"
              aria-label="Current action status"
            >
              <span className="eyebrow">Current action</span>
              <strong>{actionStage.label}</strong>
              <small>{actionStage.detail}</small>
              {command ? (
                <span className="map-action-command">
                  {command.tool} · {command.state}
                </span>
              ) : null}
            </div>
            {completedCommands.length && source === "sample" ? (
              <div className="map-reflection-card" aria-label="Learning recap">
                <span className="eyebrow">Reflection bench</span>
                <strong>What did you notice?</strong>
                <small>
                  In one short sentence, name the evidence or safe step you
                  learned.
                </small>
                <label htmlFor="map-reflection-note">Your reflection</label>
                <input
                  id="map-reflection-note"
                  value={reflectionNote}
                  onChange={(event) => {
                    setReflectionNote(event.target.value);
                    setReflectionSaved(false);
                  }}
                  placeholder="I noticed…"
                  maxLength={240}
                  disabled={reflectionSaved}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={saveReflection}
                  disabled={reflectionSaved || !reflectionNote.trim()}
                >
                  {reflectionSaved ? "Saved to journal" : "Save reflection"}
                </button>
              </div>
            ) : null}
            <div className="golden-path" aria-label="Learning journey">
              <div className="golden-path-heading">
                <strong>Learning journey</strong>
                <span>
                  {goldenPathSteps.filter((step) => goldenPath[step.id]).length}
                  /{goldenPathSteps.length}
                </span>
              </div>
              <ol>
                {goldenPathSteps.map((step) => (
                  <li
                    key={step.id}
                    className={goldenPath[step.id] ? "complete" : ""}
                    title={step.description}
                  >
                    <span aria-hidden="true">
                      {goldenPath[step.id] ? "✓" : "○"}
                    </span>
                    {step.label}
                  </li>
                ))}
              </ol>
              <p role="status" aria-live="polite">
                {source === "report"
                  ? "Public report: explore and inspect only. This garden is read-only."
                  : goldenPath.reflected
                    ? "Garden updated after verified sample re-analysis. Visit the reflection bench."
                    : goldenPath.confirmed
                      ? "The scope is confirmed. The sample rehearsal is running."
                      : goldenPath.answered
                        ? "You understand the finding. Confirm the proposed scope to continue."
                        : goldenPath.inspected
                          ? "Read the evidence, then choose a tool for this plant."
                          : goldenPath.explored
                            ? "You found the garden. Walk to a plant and inspect it."
                            : "Use the map to explore the garden."}
              </p>
            </div>
            {showHelp ? (
              <aside
                id="map-help-panel"
                className="map-help-panel"
                aria-label="Garden help"
              >
                <strong>Garden help</strong>
                <p>
                  Walk, inspect, answer, confirm, and watch the sample garden
                  re-analyze.
                </p>
                <p>
                  Public reports are read-only. H opens a question hint when a
                  challenge is active.
                </p>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowWelcome(true)}
                >
                  Show first-visit guide
                </button>
              </aside>
            ) : null}
            <button
              type="button"
              className="map-interact"
              onClick={interactNearby}
            >
              {nearbyPlant
                ? `Inspect ${nearbyPlant.path}`
                : nearbyZone
                  ? `Explore ${nearbyZone.label}`
                  : "Inspect nearby"}
            </button>
          </div>
          {pendingFinding && source === "sample" && challenge ? (
            <div
              className="map-challenge-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="map-confirm-title"
              aria-describedby="map-confirm-description"
              tabIndex={-1}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setPendingFinding(null);
                  setChallenge(null);
                  setChallengeFeedback(null);
                  setShowExplanationReview(false);
                  setShowHint(false);
                } else if (event.key.toLowerCase() === "h") {
                  event.preventDefault();
                  setShowHint(true);
                } else if (event.key.toLowerCase() === "y" && challenge.proof) {
                  event.preventDefault();
                  setShowExplanationReview(true);
                }
              }}
            >
              <span className="eyebrow">
                Learning greenhouse · {challenge.question.difficulty}
              </span>
              <h2 id="map-confirm-title">{challenge.question.actionLabel}</h2>
              <p id="map-confirm-description">
                Choose the best answer. You can try again as many times as you
                need.
              </p>
              <div className="challenge-card" aria-live="polite">
                <pre className="challenge-code" aria-label="Code excerpt">
                  <code>{challenge.question.codeExcerpt}</code>
                </pre>
                <h3 className="challenge-prompt">
                  {challenge.question.prompt}
                </h3>
                <fieldset className="challenge-choices">
                  <legend>Choose one answer</legend>
                  {challenge.question.choices.map((choice) => (
                    <label key={choice}>
                      <input
                        type="radio"
                        name="challenge-choice"
                        value={choice}
                        checked={challengeAnswer === choice}
                        disabled={Boolean(challenge.proof)}
                        onChange={(event) =>
                          setChallengeAnswer(event.target.value)
                        }
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </fieldset>
                <details className="challenge-example">
                  <summary>Show example</summary>
                  <code>{challenge.question.example}</code>
                </details>
                {showHint ? (
                  <small id="map-challenge-hint">
                    Hint: {challenge.question.hint}
                  </small>
                ) : null}
                {challengeFeedback ? (
                  <p id="map-challenge-feedback" role="status">
                    {challengeFeedback}
                  </p>
                ) : null}
                {showExplanationReview && challenge.proof ? (
                  <div className="challenge-explanation-review" role="status">
                    <strong>Why this answer works</strong>
                    <p>{challenge.question.objective}</p>
                    <p>
                      Review the proposed fix and the evidence before
                      continuing.
                    </p>
                  </div>
                ) : null}
                <button
                  type="button"
                  className="secondary-button"
                  onClick={submitChallenge}
                  disabled={Boolean(challenge.proof) || !challengeAnswer.trim()}
                >
                  Check answer
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowExplanationReview(true)}
                  disabled={!challenge.proof}
                >
                  Review explanation (Y)
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowHint(true)}
                  disabled={Boolean(challenge.proof)}
                >
                  Show hint
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowHint(true)}
                  disabled={Boolean(challenge.proof)}
                >
                  Show hint
                </button>
              </div>
              <div className="confirmation-actions">
                <button
                  type="button"
                  className="tool-button"
                  disabled={!challenge.proof}
                  onClick={() => void tendFinding(pendingFinding)}
                >
                  Confirm and tend
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setPendingFinding(null);
                    setChallenge(null);
                    setChallengeFeedback(null);
                    setShowHint(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
          <span className="garden-stage-note">
            Walkways are marked. Buildings, ponds, trees, bushes, and beds are
            solid.
          </span>
        </div>
        <div className="plant-grid" aria-label="Code garden plants">
          {scene.plants.map((plant) => (
            <div
              className={`plant-card ${plant.health} ${plant.id === selectedId ? "selected" : ""}`}
              key={plant.id}
            >
              <span className="plant-dot" style={{ background: plant.color }} />
              <div>
                <strong>{plant.path}</strong>
                <p>
                  {plant.findingCount
                    ? plant.ariaLabel
                    : "More to explore · no authored lesson yet."}
                </p>
              </div>
            </div>
          ))}
        </div>
        {selectedPlant ? (
          <aside
            className="inspector"
            aria-live="polite"
            aria-labelledby="inspector-title"
          >
            <span className="eyebrow">Inspector</span>
            <h2 id="inspector-title">{selectedPlant.path}</h2>
            <p>{selectedPlant.ariaLabel}</p>
            <p className="plant-voice">
              {plantVoice(report, selectedPlant.id)}
            </p>
            <details className="inspector-details">
              <summary>Open Magnifying Glass details</summary>
              {visibleExplanation ? (
                <div
                  className="explanation"
                  aria-label="Magnifying Glass explanation"
                >
                  <span className="eyebrow">
                    Magnifying Glass · {modeLabel}
                  </span>
                  <p>{visibleExplanation.summary}</p>
                  <p>{visibleExplanation.health}</p>
                  <p>{visibleExplanation.needs}</p>
                  {visibleExplanation.evidence.length ? (
                    <ul>
                      {visibleExplanation.evidence.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
              {selectedPlant.findings.length ? (
                <ul>
                  {selectedPlant.findings.map((finding) => (
                    <li key={`${finding.label}-${finding.summary}`}>
                      <strong>{finding.label}</strong>
                      <span>{finding.summary}</span>
                      <small>{finding.evidence}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="quiet">
                  No warning signals were recorded for this module.
                </p>
              )}
            </details>
            {source === "report" && selectedPlant.findings.length ? (
              <p className="read-only-notice" role="status">
                Public reports are read-only. Demo rehearsals are available only
                in the offline sample garden.
              </p>
            ) : null}
            {command ? (
              <p className="tend-status" role="status">
                Demo rehearsal · {command.tool} · {command.state}.{" "}
                {command.message ?? ""}
              </p>
            ) : null}
            {tendError ? (
              <p className="form-error" role="alert">
                {tendError}
              </p>
            ) : null}
          </aside>
        ) : null}
        {showCompletion && source === "sample" ? (
          <section
            className="completion-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="completion-title"
          >
            <div className="completion-card">
              <span className="eyebrow">Garden celebration</span>
              <h2 id="completion-title">All five plants are blooming!</h2>
              <p>
                You solved all five active questions in your own order. Here is
                the reviewable work.
              </p>
              <ul>
                {completionFixes.map((fix) => (
                  <li key={fix.findingId}>
                    <strong>{fix.actionLabel}</strong>
                    <span>{fix.findingId}</span>
                    <pre>
                      <code>{fix.beforeCode}</code>
                    </pre>
                    <pre>
                      <code>{fix.afterCode}</code>
                    </pre>
                    <small>
                      {fix.proposedFix ?? "Proposed fix shown for review."}
                    </small>
                    <small>
                      {fix.reanalysisEvidence ??
                        "Verified by the sample re-analysis."}
                    </small>
                  </li>
                ))}
              </ul>
              <p className="read-only-notice">
                This demo proposes a corrected copy for review. It never
                silently overwrites code, creates a PR, or changes a public
                repository.
              </p>
              <div className="confirmation-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowApplyReview((current) => !current)}
                >
                  Review what you learned
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => void copyCorrectedCode()}
                >
                  Copy corrected code
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={downloadCorrectedCode}
                >
                  Download corrected copy
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={printCompletion}
                >
                  PDF / print
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowApplyReview(true)}
                >
                  View patch / diff
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowCompletion(false)}
                >
                  Close recap
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetSampleLesson}
                >
                  Reset Garden
                </button>
              </div>
              {showApplyReview ? (
                <div
                  className="apply-review"
                  role="region"
                  aria-label="Completion review"
                >
                  <strong>Before → after and patch review</strong>
                  <p>
                    These are explicit proposed changes only. Review, copy,
                    download, or print them; nothing is written back
                    automatically.
                  </p>
                  <pre>
                    <code>{correctedCopy()}</code>
                  </pre>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setShowCompletion(false)}
                  >
                    Close review
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
        <div className="legend" aria-label="Garden health legend">
          {Object.entries(healthMetaphor).map(([state, metaphor]) => (
            <span key={state}>
              <i style={{ background: metaphor.color }} /> {metaphor.label}
            </span>
          ))}
        </div>
        {completedCommands.length ? (
          <section className="payoff" aria-labelledby="payoff-title">
            <span className="eyebrow">The garden remembers</span>
            <h2 id="payoff-title">Verified tending changes</h2>
            <p>
              These are demo rehearsals. A real release will replace each
              rehearsal with a branch, checks, PR, and pinned re-analysis
              evidence.
            </p>
            <ul>
              {completedCommands.map((completed) => (
                <li key={completed.id}>
                  {completed.tool} · {completed.findingId} · {completed.state}
                </li>
              ))}
            </ul>
            <div className="classroom-panel">
              <strong>Classroom comparison</strong>
              <span>
                {sampleHealthReport.findings.length} original signals →{" "}
                {report.findings.length} current signals
              </span>
              <span>
                Season {currentSeason.level}:{" "}
                {currentSeason.recommendedDifficulty} reasoning ·{" "}
                {completedCommands.length} verified rehearsal
                {completedCommands.length === 1 ? "" : "s"}
              </span>
              <small>
                Learning recap: explain the evidence, choose a safe next step,
                answer the challenge, then observe re-analysis. The
                public-report path stays read-only.
              </small>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setShowApplyReview((current) => !current)}
              aria-expanded={showApplyReview}
            >
              {showApplyReview ? "Close fix review" : "Review possible fixes"}
            </button>
            {showApplyReview ? (
              <div
                className="apply-review"
                role="region"
                aria-label="Possible fixes review"
              >
                <strong>Possible fixes from this lesson</strong>
                <p>
                  These are proposed scopes from the sample rehearsal. Nothing
                  has been written to a repository.
                </p>
                <ul>
                  {completedCommands.map((completed) => (
                    <li key={`review-${completed.id}`}>
                      {completed.tool}: inspect and verify {completed.findingId}
                    </li>
                  ))}
                </ul>
                <small>
                  A future live mode would require your explicit permission,
                  authentication, a branch, a diff preview, passing checks, and
                  final confirmation. Public reports remain read-only.
                </small>
              </div>
            ) : null}
          </section>
        ) : null}
        <section className="journal-panel" aria-labelledby="journal-title">
          <div>
            <span className="eyebrow">Garden journal</span>
            <h2 id="journal-title">What you learned this visit</h2>
            <p>
              This local session recap connects code evidence, your answer, and
              the verified report change. It is not saved to a repository or
              shared with anyone.
            </p>
          </div>
          <ol>
            {journalEntries.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ol>
          <div className="journal-comparison">
            <strong>Classroom comparison</strong>
            <span>
              {report.findings.length} current signals ·{" "}
              {currentSeason.gradeBand} · {currentSeason.learningFocus}
            </span>
            <small>
              Public repository gardens stay read-only. Only the bundled sample
              can complete a demo rehearsal, and only verified re-analysis
              changes its health.
            </small>
          </div>
        </section>
      </section>
    </main>
  );
}
