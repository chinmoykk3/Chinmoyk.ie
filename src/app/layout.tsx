import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/shared/Footer';
import { SmoothScrollProvider } from '@/components/shared/SmoothScrollProvider';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { LoadingScreen } from '@/components/shared/LoadingScreen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chinmoyk.ie'),
  title: {
    default: 'Chinmoy Kalita — A Mind in Motion',
    template: '%s | Chinmoy Kalita',
  },
  description:
    'Interactive editorial portfolio of Chinmoy Kalita. Full-stack Developer, AI Engineer and Graphic Designer. Three disciplines. One creative universe.',
  keywords: [
    'Chinmoy Kalita',
    'Full-Stack Developer',
    'AI Engineer',
    'Graphic Designer',
    'Next.js',
    'Three.js',
    'Creative Developer',
    'Portfolio',
    'SAHYOG',
    'LIBRARIUM',
    'SHUTTERSCAPE',
  ],
  authors: [{ name: 'Chinmoy Kalita', url: 'https://chinmoyk.ie' }],
  creator: 'Chinmoy Kalita',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chinmoyk.ie',
    title: 'Chinmoy Kalita — A Mind in Motion',
    description:
      'Full-stack Developer, AI Engineer and Graphic Designer. Three disciplines. One creative universe.',
    siteName: 'Chinmoy Kalita Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinmoy Kalita — A Mind in Motion',
    description:
      'Full-stack Developer, AI Engineer and Graphic Designer. Three disciplines. One creative universe.',
    creator: '@chinmoykalita',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#090a0d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-canvas text-paper antialiased selection:bg-ochre selection:text-canvas">
        <LoadingScreen />
        <CustomCursor />
        <SmoothScrollProvider>
          {/* Subtle noise/grain layer */}
          <div className="editorial-grain" aria-hidden="true" />
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
