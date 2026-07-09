/**
 * Hero arka planı için dekoratif anakart/çip illüstrasyonu.
 * Saf SVG — istek yok, LCP maliyeti yok; iki node hafifçe yanıp söner.
 */
export function HeroCircuit({ className }: { className?: string }) {
  const trace = "oklch(0.75 0.12 240)";

  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* Devre izleri — dirsekli hatlar */}
      <g stroke={trace} strokeWidth="1.5" opacity="0.4">
        <path d="M240 36 V166" />
        <path d="M180 60 V120 H204 V166" />
        <path d="M300 60 V120 H276 V166" />
        <path d="M240 444 V314" />
        <path d="M180 420 V360 H204 V314" />
        <path d="M300 420 V360 H276 V314" />
        <path d="M36 240 H166" />
        <path d="M60 180 H120 V204 H166" />
        <path d="M60 300 H120 V276 H166" />
        <path d="M444 240 H314" />
        <path d="M420 180 H360 V204 H314" />
        <path d="M420 300 H360 V276 H314" />
      </g>

      {/* İz uçlarındaki lehim noktaları */}
      <g fill={trace}>
        <circle cx="240" cy="36" r="5" opacity="0.7" className="animate-pulse" />
        <circle cx="180" cy="60" r="4" opacity="0.5" />
        <circle cx="300" cy="60" r="4" opacity="0.5" />
        <circle cx="240" cy="444" r="4" opacity="0.5" />
        <circle cx="180" cy="420" r="4" opacity="0.5" />
        <circle cx="300" cy="420" r="4" opacity="0.5" />
        <circle cx="36" cy="240" r="4" opacity="0.5" />
        <circle cx="60" cy="180" r="4" opacity="0.5" />
        <circle cx="60" cy="300" r="4" opacity="0.5" />
        <circle cx="444" cy="240" r="5" opacity="0.7" className="animate-pulse" />
        <circle cx="420" cy="180" r="4" opacity="0.5" />
        <circle cx="420" cy="300" r="4" opacity="0.5" />
      </g>

      {/* Çip gövdesi */}
      <rect
        x="166"
        y="166"
        width="148"
        height="148"
        rx="18"
        fill="oklch(0.26 0.05 262)"
        stroke={trace}
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <rect
        x="192"
        y="192"
        width="96"
        height="96"
        rx="10"
        stroke={trace}
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <text
        x="240"
        y="258"
        textAnchor="middle"
        fontSize="52"
        fontWeight="700"
        fill={trace}
        opacity="0.85"
      >
        M
      </text>
    </svg>
  );
}
