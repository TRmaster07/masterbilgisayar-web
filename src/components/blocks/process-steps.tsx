export type ProcessStep = { title: string; description: string };

export function ProcessSteps({
  steps,
  heading,
}: {
  steps: readonly ProcessStep[];
  heading: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {heading}
      </h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative rounded-xl border border-border bg-card p-5">
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
            >
              {index + 1}
            </span>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
