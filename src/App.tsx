import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { Navigation } from '@/components/layout/Navigation'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import '@/styles/globals.css'

function App() {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <main className="min-h-screen overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App