"use client";

import { useState } from "react";
import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { explainNode } from "@/lib/ai/explain";
import { healthMetaphor } from "@/lib/garden/metaphor";
import { projectHealthReport } from "@/lib/garden/project";

export default function HomePage() {
  const scene = projectHealthReport(sampleHealthReport);
  const [selectedId, setSelectedId] = useState(scene.plants[0]?.id);
  const selectedPlant = scene.plants.find((plant) => plant.id === selectedId);
  const explanation = selectedPlant
    ? explainNode(sampleHealthReport, selectedPlant.id)
    : null;

  return (
    <main>
      <section className="garden" aria-labelledby="title">
        <span className="eyebrow">Code Garden · sample mode</span>
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
            {explanation ? (
              <div
                className="explanation"
                aria-label="Magnifying Glass explanation"
              >
                <span className="eyebrow">Magnifying Glass · sample mode</span>
                <p>{explanation.summary}</p>
                <p>{explanation.health}</p>
                <p>{explanation.needs}</p>
                {explanation.evidence.length ? (
                  <ul>
                    {explanation.evidence.map((item) => (
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
          </aside>
        ) : null}
        <div className="legend" aria-label="Garden health legend">
          {Object.entries(healthMetaphor).map(([state, metaphor]) => (
            <span key={state}>
              <i style={{ background: metaphor.color }} /> {metaphor.label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
