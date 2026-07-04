"use client";

import Script from "next/script";

import { useConsent } from "@/components/analytics/use-consent";
import { CLARITY_ID } from "@/lib/analytics";

/**
 * Microsoft Clarity — yalnızca kullanıcı onayı sonrası yüklenir
 * (Clarity çerez kullandığı için Consent Mode dışında ayrıca kapılanır).
 */
export function Clarity() {
  const consent = useConsent();

  if (!CLARITY_ID || consent !== "granted") return null;

  return (
    <Script
      id="clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
      }}
    />
  );
}
