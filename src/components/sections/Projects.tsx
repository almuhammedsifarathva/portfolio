'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { projects, projectCategories } from '@/data/projects'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/data/constants'

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 px-4 bg-zinc-950/50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-2 block">
            Design & Development Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Featured Concepts</h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            Explore sample interface designs, responsive layouts, and interactive web concepts I build for clients.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-emerald-400 text-zinc-950 shadow-[0_0_15px_rgba(6,214,160,0.4)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-zinc-900/60 border-white/10 overflow-hidden hover:border-emerald-400/40 transition-colors group">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-md bg-white/5 text-emerald-400 border border-emerald-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(6,214,160,0.1)]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 text-xs font-semibold mb-6 border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5" /> Direct Client Inquiries
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Have a Project in Mind?</h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            I am currently taking on new projects. Let&apos;s build a custom, visually satisfying website that delivers real results for your business.
          </p>
          <a href={siteConfig.whatsappLink} target="_blank" rel="noreferrer" className="inline-block">
            <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-[0_0_25px_rgba(6,214,160,0.4)]">
              Let&apos;s Build Together <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}