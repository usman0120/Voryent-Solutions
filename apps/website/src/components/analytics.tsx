import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
  const gaId = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"];
  const gscVerificationId = process.env["NEXT_PUBLIC_GSC_VERIFICATION_ID"];
  const bingVerificationId = process.env["NEXT_PUBLIC_BING_VERIFICATION_ID"];
  const clarityId = process.env["NEXT_PUBLIC_CLARITY_ID"];

  return (
    <>
      {gscVerificationId && (
        <meta name="google-site-verification" content={gscVerificationId} />
      )}
      
      {bingVerificationId && (
        <meta name="msvalidate.01" content={bingVerificationId} />
      )}

      {gaId && <GoogleAnalytics gaId={gaId} />}

      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
