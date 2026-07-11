import Script from "next/script";
import { getAnalyticsSettings } from "@/lib/firebase/services";

export async function Analytics() {
  let settings: any = null;
  try {
    settings = await getAnalyticsSettings();
  } catch (error) {
    console.error("Failed to fetch analytics settings:", error);
  }

  if (!settings) return null;

  return (
    <>
      {settings["gscVerificationId"] && (
        <meta name="google-site-verification" content={settings["gscVerificationId"]} />
      )}
      
      {settings["bingVerificationId"] && (
        <meta name="msvalidate.01" content={settings["bingVerificationId"]} />
      )}

      {settings["ga4Id"] && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings["ga4Id"]}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings["ga4Id"]}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {settings["clarityId"] && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${settings["clarityId"]}");
          `}
        </Script>
      )}
    </>
  );
}
