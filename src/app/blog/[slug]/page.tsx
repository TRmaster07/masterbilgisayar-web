import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { CtaSection } from "@/components/blocks/cta-section";
import { ServiceCard } from "@/components/blocks/service-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BUSINESS } from "@/data/business";
import { getPost, POSTS } from "@/data/posts";
import { getService } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

const DATE_FORMATTER = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedService = getService(post.relatedService);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "tr-TR",
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.domain,
    },
    publisher: { "@id": `${BUSINESS.domain}/#localbusiness` },
  };

  return (
    <main className="flex-1">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-14 pt-4">
        <header>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays aria-hidden className="size-4" />
            <time dateTime={post.publishedAt}>
              {DATE_FORMATTER.format(new Date(post.publishedAt))}
            </time>
            <span aria-hidden>·</span>
            {BUSINESS.name} Teknik Ekibi
          </p>
        </header>

        <div className="prose-custom mt-8 space-y-5 text-[0.95rem] leading-7 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-foreground/90 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>

        {relatedService && (
          <aside className="mt-12">
            <h2 className="text-xl font-bold tracking-tight">
              Bu konuda hizmetimiz
            </h2>
            <div className="mt-4 max-w-sm">
              <ServiceCard service={relatedService} />
            </div>
          </aside>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
          Diğer rehberler için{" "}
          <Link href="/blog" className="font-medium text-primary hover:underline">
            blog sayfamıza
          </Link>{" "}
          göz atın.
        </p>
      </article>
      <CtaSection heading="Sorununuz devam mı ediyor?" />
    </main>
  );
}
