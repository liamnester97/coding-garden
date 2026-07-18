"use client";

import { useEffect, useState } from "react";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { explainNode, type GardenExplanation } from "@/lib/garden/explanation";
import { healthMetaphor } from "@/lib/garden/metaphor";
import { projectHealthReport } from "@/lib/garden/project";
import type { ToolCommand } from "@/lib/garden/command";
import { plantVoice, sampleSeasons } from "@/lib/garden/seasons";

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
  const [completedCommands, setCompletedCommands] = useState<ToolCommand[]>([]);
  const [seasonId, setSeasonId] = useState("early-spring");
  const seasons = sampleSeasons(sampleHealthReport);
  const scene = projectHealthReport(report);
  const [selectedId, setSelectedId] = useState(scene.plants[0]?.id);
  const selectedPlant = scene.plants.find((plant) => plant.id === selectedId);
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
            onChange={(event) => {
              const next = seasons.find(
                (season) => season.id === event.target.value,
              );
              if (next) {
                setSeasonId(next.id);
                setReport(next.report);
                setSource("sample");
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
            {seasons.find((season) => season.id === seasonId)?.description}
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
          <svg
            viewBox="0 0 100 100"
            role="img"
            aria-label={`${scene.repoName} module map with ${scene.plants.length} plants and ${scene.roots.length} roots`}
          >
            <g className="roots" aria-hidden="true">
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
            <g className="map-plants" aria-hidden="true">
              {scene.plants.map((plant) => (
                <circle
                  key={plant.id}
                  cx={plant.x}
                  cy={plant.y}
                  r={
                    plant.health === "healthy"
                      ? 2.2
                      : plant.health === "stressed"
                        ? 2.8
                        : 3.4
                  }
                  className={plant.health}
                />
              ))}
            </g>
          </svg>
          <span className="garden-stage-note">
            Roots show analyzed relative imports. Select a plant below for the
            full evidence.
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
            {pendingFinding && source === "sample" && visibleExplanation ? (
              <div
                className="confirmation-card"
                role="dialog"
                aria-labelledby="confirm-title"
              >
                <span className="eyebrow">Ready to tend</span>
                <h3 id="confirm-title">Review the proposed demo change</h3>
                <p>
                  This rehearsal targets{" "}
                  <strong>{pendingFinding.evidence.file}</strong>. The selected
                  finding will be cleared only after the rehearsal reaches
                  verification and re-analysis.
                </p>
                <div className="confirmation-actions">
                  <button
                    type="button"
                    className="tool-button"
                    onClick={() => void tendFinding(pendingFinding)}
                  >
                    Confirm demo rehearsal
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setPendingFinding(null)}
                  >
                    Cancel
                  </button>
                </div>
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
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
