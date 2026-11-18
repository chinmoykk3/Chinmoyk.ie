import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { DocumentaryCanvas } from '@/components/three/DocumentaryCanvas';
import { instrumentSerif, geistSans, geistMono } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Chinmoy Kalita — A Story Still Unfolding',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Anti-flash script for persistent theme without layout shift or flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-theme-bg text-theme-text antialiased selection:bg-theme-amber/30 selection:text-theme-text flex flex-col font-sans transition-colors duration-200">
        <SmoothScroll>
          <DocumentaryCanvas />
          <Navbar />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
