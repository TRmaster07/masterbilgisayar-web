import Script from "next/script";

import { CONSENT_STORAGE_KEY, GTM_ID } from "@/lib/analytics";

/**
 * Consent Mode v2 varsayılanları + GTM yükleyici.
 * Varsayılan: tüm depolama "denied". Kullanıcı daha önce onay verdiyse
 * (localStorage) analytics_storage "granted" ile başlar.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  // Consent varsayılanları GTM yükleyicisinden hemen önce, AYNI script
  // içinde çalışır — sıralama garantisi için tek blok tutulur.
  const gtmWithConsent = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var mbConsent = "denied";
try { mbConsent = localStorage.getItem("${CONSENT_STORAGE_KEY}") === "granted" ? "granted" : "denied"; } catch (e) {}
gtag("consent", "default", {
  analytics_storage: mbConsent,
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

  return (
    <>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: gtmWithConsent }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
