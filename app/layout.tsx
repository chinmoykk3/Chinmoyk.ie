import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ThreadSpine } from '@/components/motion/ThreadSpine';
import { DocumentaryCanvas } from '@/components/three/DocumentaryCanvas';
import { JsonLdPerson } from '@/components/seo/JsonLdPerson';
import { PrivacyAnalytics } from '@/components/analytics/PrivacyAnalytics';
import { instrumentSerif, geistSans, geistMono } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://chinmoyk.ie'),
  title: {
    default: 'Chinmoy Kalita — A Story Still Unfolding',
    template: '%s | Chinmoy Kalita',
  },
  description:
    'An interactive first-person documentary portfolio tracing curiosity, system engineering, creative expression, and AI frontiers.',
  keywords: [
    'Chinmoy Kalita',
    'Documentary Portfolio',
    'Creative Technologist',
    'Full Stack Engineer',
    'Interactive 3D',
    'Web3',
    'AI Systems',
  ],
  authors: [{ name: 'Chinmoy Kalita' }],
  creator: 'Chinmoy Kalita',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chinmoyk.ie',
    siteName: 'Chinmoy Kalita — A Story Still Unfolding',
    title: 'Chinmoy Kalita — A Story Still Unfolding',
    description:
      'An interactive first-person documentary portfolio tracing curiosity, system engineering, creative expression, and AI frontiers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinmoy Kalita — A Story Still Unfolding',
    description:
      'An interactive first-person documentary portfolio tracing curiosity, system engineering, creative expression, and AI frontiers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`no-js ${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <JsonLdPerson />
        <PrivacyAnalytics />
        {/* Anti-flash theme script + JS detection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <noscript>
          <style>{`
            .opening-experience-overlay { display: none !important; }
            .no-js-hidden { display: none !important; }
            .no-js-show { display: block !important; }
          `}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-theme-bg text-theme-text antialiased selection:bg-theme-gold/30 selection:text-theme-text flex flex-col font-sans transition-colors duration-200">
        <noscript>
          <div className="bg-theme-surface border-b border-theme-border px-4 py-2.5 text-center text-xs font-mono text-theme-muted">
            Static reading mode active (JavaScript disabled). All documentary movements, case
            studies, and artifacts are directly accessible below.
          </div>
        </noscript>
        <MotionProvider>
          <DocumentaryCanvas />
          <ThreadSpine />
          <Navbar />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
