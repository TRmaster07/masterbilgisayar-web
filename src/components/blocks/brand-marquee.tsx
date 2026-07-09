/**
 * Onarılan markaların kayan bandı (marquee). Saf CSS animasyonu —
 * prefers-reduced-motion'da durur, ekran okuyucular sr-only listeyi görür.
 */
const BRANDS = [
  "Apple",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "MSI",
  "Dell",
  "Casper",
  "Monster",
  "Samsung",
  "Huawei",
  "PlayStation",
  "Xbox",
  "Toshiba",
] as const;

export function BrandMarquee() {
  return (
    <section
      aria-label="Onardığımız markalar"
      className="border-y border-border bg-white/[0.03] py-8"
    >
      <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
        Onardığımız markalar
      </p>
      <div
        aria-hidden
        className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="marquee-track flex w-max items-center gap-14 pr-14">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-xl font-semibold tracking-tight whitespace-nowrap text-foreground/40"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {BRANDS.map((brand) => (
          <li key={brand}>{brand}</li>
        ))}
      </ul>
    </section>
  );
}
