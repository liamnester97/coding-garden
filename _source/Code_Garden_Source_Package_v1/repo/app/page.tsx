import { sampleHealthReport } from "@/lib/analysis/sample-report";
import { healthMetaphor } from "@/lib/garden/metaphor";
import { projectHealthReport } from "@/lib/garden/project";

export default function HomePage() {
  const scene = projectHealthReport(sampleHealthReport);

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
            <article className={`plant-card ${plant.health}`} key={plant.id}>
              <span className="plant-dot" style={{ background: plant.color }} />
              <div>
                <strong>{plant.path}</strong>
                <p>{plant.ariaLabel}</p>
              </div>
            </article>
          ))}
        </div>
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
