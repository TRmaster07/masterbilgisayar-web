import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/50"
    >
      <h3 className="font-semibold">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {service.excerpt}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Detaylı bilgi
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
