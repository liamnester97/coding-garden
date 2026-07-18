import { sampleHealthReport } from "@/lib/analysis/sample-report";

export default function HomePage() {
  const { repo, nodes, findings } = sampleHealthReport;

  return (
    <main>
      <section className="garden" aria-labelledby="title">
        <span className="eyebrow">Code Garden · sample mode</span>
        <h1 id="title">A living view of your codebase.</h1>
        <p>
          Every plant below will eventually represent a real module. For this
          first slice, the garden opens from deterministic sample data while the
          analysis engine and real tending tools are built.
        </p>
        <span className="status">
          {repo.name} · {nodes.length} plants · {findings.length} findings
        </span>
      </section>
    </main>
  );
}
