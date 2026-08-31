'use client'

import { motion } from 'framer-motion'
import { ArrowDown, MousePointer, Code, Palette, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AnimatedElement, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedElement'
import { BackgroundMesh } from '@/components/effects/BackgroundMesh'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { siteConfig, navigation } from '@/data/constants'
import { cn } from '@/lib/utils'

export function Hero() {
  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <BackgroundMesh />
      <CursorGlow />

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
        <div className="section-container relative z-10">
          <StaggerContainer staggerDelay={0.15} className="text-center">
            <StaggerItem animation="slide-down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-caption font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Available for freelance & collaborations
              </div>
            </StaggerItem>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative mb-8 w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full p-1 bg-gradient-to-r from-emerald-400 to-cyan-500 shadow-[0_0_40px_rgba(4,214,160,0.3)]"
            >
              <img
                src={siteConfig.avatar}
                alt="Al Muhammed Sifarath"
                className="w-full h-full object-cover rounded-full bg-background/50 border-4 border-background"
              />
            </motion.div>

            <StaggerItem animation="slide-up" delay={0.2}>
              <h1 id="hero-title" className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
                <span className="block">Hi, I'm</span>
                <span className="block text-gradient break-words">{siteConfig.name}</span>
              </h1>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.3}>
              <p className="font-display text-display-md text-foreground/70 mb-8 max-w-3xl mx-auto">
                {siteConfig.title}
              </p>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.4}>
              <p className="font-ui text-body-lg text-foreground/60 max-w-2xl mx-auto mb-12">
                I craft bold, creative digital experiences that are visually stunning and tactilely satisfying.
                From pixel-perfect designs to performant, scalable web applications.
              </p>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Button size="lg" onClick={() => scrollToSection('#contact')}>
                  Start a Project
                  <ArrowDown className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => scrollToSection('#projects')}>
                  View Work
                </Button>
              </div>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.6}>
              <div className="flex flex-wrap items-center justify-center gap-8 text-body-sm text-foreground/50">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>Frontend Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-warm" aria-hidden="true" />
                  <span>Web Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>Full Stack</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            aria-hidden="true"
          >
            <MousePointer className="w-5 h-5" />
            <span className="text-caption">Scroll to explore</span>
            <motion.div
              className="w-1.5 h-6 border-2 border-foreground/30 rounded-full flex justify-center pt-1"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-foreground/40 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}