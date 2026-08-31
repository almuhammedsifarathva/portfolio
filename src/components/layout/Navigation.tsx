'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, ChevronDown } from 'lucide-react'
import { navigation } from '@/data/constants'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navigation.map((nav) => nav.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    const element = document.getElementById(id)
    if (!element) return

    setIsMobileMenuOpen(false)
    const navigationHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 0
    const targetTop = element.getBoundingClientRect().top + window.scrollY - navigationHeight

    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    window.history.replaceState(null, '', href)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-expo-out',
          isScrolled
            ? 'glass-strong py-4 shadow-elevation-2'
            : 'bg-transparent py-6'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#hero')
            }}
            className="font-display text-heading-sm font-bold text-gradient hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            AMS
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className={cn(
                  'relative text-body-sm font-medium transition-colors duration-200 hover:text-accent',
                  activeSection === item.href.slice(1)
                    ? 'text-accent'
                    : 'text-foreground/70'
                )}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/918086917211"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Contact Me
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                'md:hidden overflow-hidden border-t border-border/50 bg-background-elevated/95 backdrop-blur-xl',
                isScrolled ? 'glass-strong' : 'bg-background-elevated/95'
              )}
            >
              <div className="px-6 py-6 space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-body-md font-medium transition-colors',
                      activeSection === item.href.slice(1)
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                    )}
                    aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://wa.me/918086917211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center mt-4"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ScrollProgress />
    </>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.min((scrollTop / docHeight) * 100, 100))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent pointer-events-none z-40"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-accent to-warm origin-left"
        style={{ transformOrigin: 'left center' }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  )
}