import React from 'react';

/**
 * Optional Privacy-Friendly Analytics
 * Cookieless, GDPR/CCPA compliant telemetry (Plausible or Cloudflare Web Analytics).
 * Only renders if environment variables are explicitly provided by the user.
 */
export function PrivacyAnalytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const cfToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  return (
    <>
      {plausibleDomain && (
        <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" />
      )}
      {cfToken && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: cfToken })}
        />
      )}
    </>
  );
}
