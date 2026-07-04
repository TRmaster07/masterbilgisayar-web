import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { CtaSection } from "@/components/blocks/cta-section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { POSTS } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — Tamir Rehberleri ve İpuçları",
  description:
    "Master Bilgisayar blog: laptop, bilgisayar, MacBook ve konsol arızaları hakkında uzman rehberler, ilk yardım adımları ve bakım ipuçları.",
  alternates: { canonical: "/blog" },
};

const DATE_FORMATTER = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const sorted = [...POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <main className="flex-1">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <section className="mx-auto max-w-4xl px-4 pb-14 pt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tamir Rehberleri ve İpuçları
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Cihazınızın arızasını anlamanıza yardımcı olacak, servis
          deneyimimizden süzülmüş pratik rehberler.
        </p>

        <div className="mt-8 space-y-4">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays aria-hidden className="size-3.5" />
                <time dateTime={post.publishedAt}>
                  {DATE_FORMATTER.format(new Date(post.publishedAt))}
                </time>
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Yazıyı okuyun <ArrowRight aria-hidden className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
