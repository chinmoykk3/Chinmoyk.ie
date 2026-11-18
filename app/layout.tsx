import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { DocumentaryCanvas } from '@/components/three/DocumentaryCanvas';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-canvas-base text-foreground antialiased selection:bg-amber-400/30 selection:text-amber-200 flex flex-col font-sans">
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
