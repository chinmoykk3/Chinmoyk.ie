import { contactData } from '@/content/contact';

export function JsonLdPerson() {
  // Only include verified external URLs, excluding placeholders and mailto links
  const verifiedSocials = contactData.socials
    .filter((s) => !s.url.includes('[TODO') && !s.url.startsWith('mailto:'))
    .map((s) => s.url);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contactData.name,
    url: 'https://chinmoyk.ie',
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
