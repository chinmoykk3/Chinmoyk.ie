import { contactData } from '@/content/contact';

export function JsonLdPerson() {
  // Only include verified external URLs, excluding placeholders and mailto links
  const verifiedSocials = contactData.socials
    .filter((s) => !s.url.includes('[TODO') && !s.url.startsWith('mailto:'))
    .map((s) => s.url);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chinmoyk-ie.vercel.app';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contactData.name,
    url: siteUrl,
    email: contactData.email,
    description: contactData.bioSnippet,
    ...(verifiedSocials.length > 0 ? { sameAs: verifiedSocials } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  );
}
