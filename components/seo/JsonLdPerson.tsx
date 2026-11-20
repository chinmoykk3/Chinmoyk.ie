import { contactData } from '@/content/contact';
import { getContentText, isContentRenderable } from '@/content/schema';

export function JsonLdPerson() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chinmoyk-ie.vercel.app';

  // Include only fields explicitly confirmed or supplied by Chinmoy (omitting placeholders)
  const nameStr = getContentText(contactData.name);
  const bioStr = isContentRenderable(contactData.bioSnippet)
    ? getContentText(contactData.bioSnippet)
    : undefined;
  const roleStr = isContentRenderable(contactData.currentRoleOrStatus)
    ? getContentText(contactData.currentRoleOrStatus)
    : undefined;
  const locationStr = isContentRenderable(contactData.location)
    ? getContentText(contactData.location)
    : undefined;

  // Social URLs supplied and not flagged as placeholders or mailto
  const verifiedSocials = contactData.socials
    .filter((s) => !s.isPlaceholder && !s.url.includes('[TODO') && !s.url.startsWith('mailto:'))
    .map((s) => s.url);

  const personSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nameStr || 'Chinmoy Kalita',
    url: siteUrl,
  };

  if (contactData.email && !contactData.email.includes('[TODO')) {
    personSchema.email = contactData.email;
  }

  if (bioStr) {
    personSchema.description = bioStr;
  }

  if (roleStr) {
    personSchema.jobTitle = roleStr;
  }

  if (locationStr) {
    personSchema.address = {
      '@type': 'PostalAddress',
      addressLocality: locationStr,
    };
  }

  if (verifiedSocials.length > 0) {
    personSchema.sameAs = verifiedSocials;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  );
}
