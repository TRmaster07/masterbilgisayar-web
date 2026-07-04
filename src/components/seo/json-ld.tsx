/** JSON-LD schema bloğunu güvenli şekilde render eder */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // "<" karakteri escape edilir — script içi XSS önlemi
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
