import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LayoutWrapper } from './components/layout/LayoutWrapper'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CommandPalette } from './components/ui/CommandPalette'
import { KonamiListener } from './hooks/useKonami'
import { NotFound } from './pages/NotFound'

// Lazy load heavy page sections for performance point
const Hero = lazy(() => import('./components/sections/Hero').then(m => ({ default: m.Hero })))
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })))
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })))
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })))
const Experience = lazy(() => import('./components/sections/Experience').then(m => ({ default: m.Experience })))
const Playground = lazy(() => import('./components/sections/Playground').then(m => ({ default: m.Playground })))
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })))

function Home() {
  return (
    <main className="w-full flex-grow flex flex-col items-center">
      <Hero />
      <About />
      <Projects />
      <div className="w-full relative z-10 bg-bg">
        <Skills />
        <Experience />
        <Playground />
        <Testimonials />
        <Contact />
      </div>
    </main>
  )
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Navbar />
        <CommandPalette />
        <KonamiListener />

        <Suspense fallback={<div className="min-h-screen bg-bg" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </LayoutWrapper>
    </Router>
  )
}

export default App
