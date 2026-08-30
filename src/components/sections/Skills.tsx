'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown, ChevronUp, Code, Server, Palette, Wrench } from 'lucide-react'
import { skills, skillCategories, SkillCategory } from '@/data/skills'
import { AnimatedElement, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedElement'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const categoryIcons = {
  frontend: Code,
  backend: Server,
  design: Palette,
  tools: Wrench,
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend')

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="relative" aria-labelledby="skills-title">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <AnimatedElement animation="slide-down" delay={0.1}>
            <h2 id="skills-title" className="font-display text-display-md text-foreground mb-6">
              Skills & Technologies
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={0.2}>
            <p className="font-ui text-body-lg text-foreground/60 max-w-2xl mx-auto">
              A curated list of technologies and tools I work with daily. I'm constantly learning and expanding my toolkit.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="slide-up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Skill categories">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`${category.id}-panel`}
                id={`${category.id}-tab`}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-spring',
                  activeCategory === category.id
                    ? 'bg-accent/10 text-accent border border-accent/30 shadow-glow-accent'
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5 border border-border/50'
                )}
              >
                {(() => {
                  const IconComponent = categoryIcons[category.id]
                  return <IconComponent className="w-4 h-4" aria-hidden="true" />
                })()}
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedElement>

        <div id="skills-panel" role="tabpanel" aria-label="Skills list">
          {skillCategories.map((category) => (
            <AnimatedElement
              key={category.id}
              animation="slide-up"
              delay={0.4}
              className={activeCategory === category.id ? 'block' : 'hidden'}
            >
              <div id={`${category.id}-panel`} role="tabpanel" aria-labelledby={`${category.id}-tab`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkills.map((skill, index) => (
                    <StaggerItem key={skill.name} animation="scale-in" delay={index * 0.05}>
                      <Card variant="outlined" hoverable className="group p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                              'group-hover:scale-110'
                            )}
                            style={{
                              backgroundColor: `rgba(${skill.category === 'frontend' ? '6, 214, 160' : skill.category === 'backend' ? '255, 107, 53' : skill.category === 'design' ? '168, 85, 247' : '59, 130, 246'}, 0.15)`,
                            }}
                          >
                            {(() => {
                              const IconComponent = categoryIcons[skill.category as keyof typeof categoryIcons]
                              return <IconComponent className="w-6 h-6" style={{ color: `rgb(${skill.category === 'frontend' ? '6, 214, 160' : skill.category === 'backend' ? '255, 107, 53' : skill.category === 'design' ? '168, 85, 247' : '59, 130, 246'})` }} aria-hidden="true" />
                            })()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-heading-sm text-foreground mb-1">{skill.name}</h3>
                            <p className="font-ui text-body-sm text-foreground/60 mb-3 line-clamp-2">{skill.description}</p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-border/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                  className="h-full bg-gradient-to-r from-accent to-warm rounded-full"
                                />
                              </div>
                              <span className="font-mono text-body-sm text-accent w-10 text-right">{skill.proficiency}%</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </StaggerItem>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}