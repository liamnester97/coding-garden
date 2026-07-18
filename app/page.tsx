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
  toolStations,
  type Facing,
  type WorldPoint,
} from "@/lib/garden/world";
import {
  authoredGardenDecorations,
  spritePosition,
  type PixelSpriteId,
} from "@/lib/garden/assets";
import { authoredGardenMap } from "@/lib/garden/map";

const stationSprites: Record<string, PixelSpriteId> = {
  magnify: "magnifying-glass",
  clippers: "clippers",
  "watering-can": "watering-can",
};

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
  const [report, setReport] = useState(sampleHealthReport);
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
  const challengeAnswerRef = useRef<HTMLInputElement>(null);
  const [gardener, setGardener] = useState<WorldPoint>(gardenerStart);
  const [gardenerFacing, setGardenerFacing] = useState<Facing>("down");
  const [interactionMessage, setInteractionMessage] = useState<string | null>(
    null,
  );
  const [completedCommands, setCompletedCommands] = useState<ToolCommand[]>([]);
  const [seasonId, setSeasonId] = useState("early-spring");
  const seasons = sampleSeasons(sampleHealthReport);
  const currentSeason =
    seasons.find((season) => season.id === seasonId) ?? seasons[0];
  const scene = projectHealthReport(report);
  const solids = authoredGardenMap.solids;
  const [selectedId, setSelectedId] = useState(scene.plants[0]?.id);
  const selectedPlant = scene.plants.find((plant) => plant.id === selectedId);
  const nearbyPlant = scene.plants.find((plant) =>
    isNearWorldPoint(gardener, plant, 10),
  );
  const nearbyStation = toolStations.find((station) =>
    isNearWorldPoint(gardener, station, 12),
  );
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
    void startChallenge(finding, challengeDifficulty);
  }

  function focusStation(stationId: (typeof toolStations)[number]["id"]) {
    const finding =
      stationId === "clippers"
        ? report.findings.find((candidate) => candidate.type === "dead-code")
        : stationId === "watering-can"
          ? report.findings.find(
              (candidate) => candidate.type === "coverage-gap",
            )
          : undefined;
    setSelectedId(finding?.nodeId ?? report.nodes[0]?.id);
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
  }

  function interactNearby() {
    if (nearbyStation) {
      focusStation(nearbyStation.id);
      setInteractionMessage(
        `${nearbyStation.label} is ready. Choose a plant to practice on.`,
      );
      return;
    }
    if (nearbyPlant) {
      setSelectedId(nearbyPlant.id);
      setInteractionMessage(
        `Inspecting ${nearbyPlant.path}. Read the evidence before choosing a tool.`,
      );
      return;
    }
    if (nearbyZone?.id === "learning") {
      setInteractionMessage(
        "Learning greenhouse: move near a plant, then press Inspect nearby.",
      );
      return;
    }
    if (nearbyZone?.id === "payoff") {
      setInteractionMessage(
        "Reflection bench: this is where the before-and-after learning recap appears.",
      );
      return;
    }
    setInteractionMessage(
      "Nothing is close enough yet. Walk toward a plant, station, greenhouse, or bench.",
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
        error?: string;
      };
      if (payload.correct && payload.proof) {
        setChallenge((current) =>
          current ? { ...current, proof: payload.proof } : current,
        );
        setChallengeFeedback(
          "Correct. Review the proposed scope before starting the rehearsal.",
        );
      } else {
        setChallengeFeedback(
          payload.feedback ?? payload.error ?? payload.hint ?? "Try again.",
        );
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
            : null;
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
    let currentCommand: ToolCommand = {
      ...seed,
      state: "seen",
      mode: "demo-rehearsal",
      prUrl: null,
    };
    let currentReport = report;
    let firstRequest = true;
    try {
      while (currentCommand.state !== "landed") {
        const response = await fetch("/api/tend", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            report: currentReport,
            command: firstRequest ? seed : currentCommand,
            proof: firstRequest ? challenge.proof : undefined,
            action: "advance",
          }),
        });
        const payload = (await response.json()) as {
          command?: ToolCommand;
          report?: typeof report;
          error?: string;
        };
        if (!response.ok || !payload.command || !payload.report)
          throw new Error(payload.error ?? "Tending failed");
        currentCommand = payload.command;
        currentReport = payload.report;
        firstRequest = false;
        setCommand(currentCommand);
      }
      setReport(currentReport);
      setSource("sample");
      setSelectedId(finding.nodeId);
      setCompletedCommands((completed) => [...completed, currentCommand]);
      setPendingFinding(null);
      setChallenge(null);
    } catch (caught) {
      setTendError(caught instanceof Error ? caught.message : "Tending failed");
      setCommand({ ...currentCommand, state: "failed" });
    }
  }

  return (
    <main>
      <section className="garden" aria-labelledby="title">
        <span className="eyebrow">Code Garden · {modeLabel}</span>
        <h1 id="title">A living view of your codebase.</h1>
        <p>
          Every plant is a module. Its condition comes from the validated health
          report, and its position is stable across renders.
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
        <div className="season-controls" aria-label="Garden seasons">
          <label htmlFor="season-select">Garden season</label>
          <select
            id="season-select"
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
                setPendingFinding(null);
                setChallenge(null);
                setSelectedId(next.report.nodes[0]?.id);
              }
            }}
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
          <small>
            Level {currentSeason.level} · {currentSeason.description}{" "}
            Recommended challenge: {currentSeason.recommendedDifficulty}.
          </small>
        </div>
        {report.scope.kind === "bounded" ? (
          <p className="scope-notice" role="status">
            Bounded analysis: {report.scope.analyzedFiles} of{" "}
            {report.scope.supportedFiles} supported files analyzed;{" "}
            {report.scope.omittedFiles} omitted by the intake limits.
          </p>
        ) : null}
        <div className="garden-stage" aria-label="Code garden map">
          <div className="garden-camera-world" style={cameraStyle}>
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
                >
                  <strong>{zone.label}</strong>
                  <small>{zone.description}</small>
                </span>
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
                }
              }}
            >
              <g className="tool-stations" aria-label="Tool stations">
                {toolStations.map((station) => (
                  <g key={station.id}>
                    <text x={station.x} y={station.y + 7} textAnchor="middle">
                      {station.label}
                    </text>
                  </g>
                ))}
              </g>
              <g className="roots" aria-hidden="true">
                {authoredGardenMap.paths.map((path) => (
                  <polyline
                    className="authored-map-path"
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
              {toolStations.map((station) => (
                <span
                  className="pixel-sprite station-sprite"
                  key={station.id}
                  style={spriteStyle(
                    stationSprites[station.id],
                    station.x - 5,
                    station.y - 5,
                    "medium",
                  )}
                />
              ))}
              {scene.plants.map((plant) => (
                <span
                  className={`pixel-sprite plant-sprite ${plant.health}`}
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
              {scene.plants.map((plant) => (
                <button
                  key={plant.id}
                  type="button"
                  className={`map-plant-button ${plant.health} ${plant.id === selectedId ? "selected" : ""}`}
                  style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
                  aria-label={`Inspect ${plant.path}`}
                  aria-pressed={plant.id === selectedId}
                  onClick={() => setSelectedId(plant.id)}
                >
                  <span
                    className="pixel-sprite map-plant-sprite"
                    style={spriteStyle(plant.sprite, 50, 50, "plant")}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="map-hud" aria-label="Garden game controls">
            <div className="map-hud-title">
              <strong>Garden controls</strong>
              <small>Walk, inspect, and learn here</small>
            </div>
            <div className="map-movement" aria-label="Move gardener">
              <button
                type="button"
                aria-label="Move up"
                onClick={() => movePlayer("ArrowUp")}
              >
                ↑
              </button>
              <button
                type="button"
                aria-label="Move left"
                onClick={() => movePlayer("ArrowLeft")}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Move down"
                onClick={() => movePlayer("ArrowDown")}
              >
                ↓
              </button>
              <button
                type="button"
                aria-label="Move right"
                onClick={() => movePlayer("ArrowRight")}
              >
                →
              </button>
            </div>
            <div className="map-stations" aria-label="Garden stations">
              {toolStations.map((station) => (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => focusStation(station.id)}
                >
                  {station.label}
                </button>
              ))}
            </div>
            <span className="map-hud-help">
              Arrows/WASD move · Enter interacts · blocked areas stay blocked
            </span>
            <button
              type="button"
              className="map-interact"
              onClick={interactNearby}
            >
              {nearbyStation
                ? `Use ${nearbyStation.label}`
                : nearbyPlant
                  ? `Inspect ${nearbyPlant.path}`
                  : nearbyZone
                    ? `Explore ${nearbyZone.label}`
                    : "Inspect nearby"}
            </button>
            <span className="map-proximity" role="status" aria-live="polite">
              {interactionMessage ??
                (nearbyStation
                  ? `Nearby: ${nearbyStation.label}`
                  : nearbyPlant
                    ? `Nearby: ${nearbyPlant.path}`
                    : nearbyZone
                      ? `Nearby: ${nearbyZone.label}`
                      : "Walk toward a marked place to interact.")}
            </span>
          </div>
          {pendingFinding &&
          source === "sample" &&
          visibleExplanation &&
          challenge ? (
            <div
              className="map-challenge-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="map-confirm-title"
              aria-describedby="map-confirm-description"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setPendingFinding(null);
                  setChallenge(null);
                  setChallengeFeedback(null);
                }
              }}
            >
              <span className="eyebrow">
                Learning greenhouse · {challenge.question.difficulty}
              </span>
              <h2 id="map-confirm-title">Answer to tend this plant</h2>
              <p id="map-confirm-description">{visibleExplanation.summary}</p>
              <div className="challenge-card" aria-live="polite">
                <strong>{challenge.question.objective}</strong>
                <label htmlFor="map-challenge-difficulty">Level</label>
                <select
                  id="map-challenge-difficulty"
                  value={challengeDifficulty}
                  disabled={Boolean(challenge.proof)}
                  onChange={(event) => {
                    const nextDifficulty = event.target
                      .value as ChallengeDifficulty;
                    setChallengeDifficulty(nextDifficulty);
                    void startChallenge(pendingFinding, nextDifficulty);
                  }}
                >
                  <option value="easy">Easy · spot it</option>
                  <option value="medium">Medium · connect it</option>
                  <option value="hard">Hard · explain it</option>
                </select>
                <label htmlFor="map-challenge-answer">
                  {challenge.question.prompt}
                </label>
                <input
                  id="map-challenge-answer"
                  ref={challengeAnswerRef}
                  value={challengeAnswer}
                  onChange={(event) => setChallengeAnswer(event.target.value)}
                  disabled={Boolean(challenge.proof)}
                  aria-describedby="map-challenge-hint map-challenge-feedback"
                />
                <small id="map-challenge-hint">
                  Hint: {challenge.question.hint}
                </small>
                {challengeFeedback ? (
                  <p id="map-challenge-feedback" role="status">
                    {challengeFeedback}
                  </p>
                ) : null}
                <button
                  type="button"
                  className="secondary-button"
                  onClick={submitChallenge}
                  disabled={Boolean(challenge.proof) || !challengeAnswer.trim()}
                >
                  Check answer
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
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
          <span className="garden-stage-note">
            Roots show analyzed relative imports. Buildings, ponds, trees, and
            beds are solid.
          </span>
        </div>
        <div className="plant-grid" aria-label="Code garden plants">
          {scene.plants.map((plant) => (
            <button
              className={`plant-card ${plant.health} ${plant.id === selectedId ? "selected" : ""}`}
              key={plant.id}
              type="button"
              aria-pressed={plant.id === selectedId}
              onClick={() => setSelectedId(plant.id)}
            >
              <span className="plant-dot" style={{ background: plant.color }} />
              <div>
                <strong>{plant.path}</strong>
                <p>{plant.ariaLabel}</p>
              </div>
            </button>
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
            {visibleExplanation ? (
              <div
                className="explanation"
                aria-label="Magnifying Glass explanation"
              >
                <span className="eyebrow">Magnifying Glass · {modeLabel}</span>
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
            {source === "report" && selectedPlant.findings.length ? (
              <p className="read-only-notice" role="status">
                Public reports are read-only. Demo rehearsals are available only
                in the offline sample garden.
              </p>
            ) : null}
            {selectedPlant.findings.length ? (
              <ul>
                {selectedPlant.findings.map((finding) => (
                  <li key={`${finding.label}-${finding.summary}`}>
                    <strong>{finding.label}</strong>
                    <span>{finding.summary}</span>
                    <small>{finding.evidence}</small>
                    {source === "sample" &&
                    (finding.label === "unreachable branch" ||
                      finding.label === "unwatered test path" ||
                      finding.label === "security pest") ? (
                      <button
                        type="button"
                        className="tool-button"
                        onClick={() => {
                          const sourceFinding = report.findings.find(
                            (candidate) =>
                              candidate.nodeId === selectedPlant.id &&
                              candidate.summary === finding.summary,
                          );
                          if (sourceFinding) requestTending(sourceFinding);
                        }}
                        disabled={
                          command?.state === "acting" ||
                          command?.state === "verifying"
                        }
                      >
                        {finding.label === "unreachable branch"
                          ? "Use Clippers"
                          : finding.label === "unwatered test path"
                            ? "Use Watering Can"
                            : "Use Pesticide"}
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="quiet">
                No warning signals were recorded for this module.
              </p>
            )}
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
          </section>
        ) : null}
      </section>
    </main>
  );
}
