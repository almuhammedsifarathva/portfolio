'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, Check, Loader2, X, Copy } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { AnimatedElement, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedElement'
import { Card, CardContent } from '@/components/ui/Card'
import { ParticleField } from '@/components/effects/ParticleField'
import { siteConfig } from '@/data/constants'
import { cn, copyToClipboard, openWhatsApp, sendEmail } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting')

    try {
      // Simulate API call - replace with actual form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For now, we'll use mailto as fallback
      const mailtoLink = `mailto:${siteConfig.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
      )}`
      window.location.href = mailtoLink

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    }
  }

  const handleCopy = async (field: string, value: string) => {
    try {
      await copyToClipboard(value)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
  }

  const contactInfo = [
    {
      label: 'Email',
      value: siteConfig.email,
      icon: Mail,
      href: `mailto:${siteConfig.email}`,
      copyable: true,
    },
    {
      label: 'WhatsApp',
      value: siteConfig.whatsapp,
      icon: Phone,
      href: siteConfig.whatsappLink,
      copyable: true,
    },
    {
      label: 'Message',
      value: 'Send me a direct message',
      icon: MessageSquare,
      href: siteConfig.whatsappLink,
      copyable: false,
    },
  ]

  return (
    <section id="contact" className="relative overflow-hidden" aria-labelledby="contact-title">
      <ParticleField count={40} className="absolute inset-0 -z-10" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <AnimatedElement animation="slide-down" delay={0.1}>
              <h2 id="contact-title" className="font-display text-display-md text-foreground mb-6">
                Let's Work Together
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={0.2}>
              <p className="font-ui text-body-lg text-foreground/60 mb-12">
                Have a project in mind? I'd love to hear about it. Whether it's a complete web application,
                a design system, or just a consultation — let's create something amazing together.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={0.3}>
              <StaggerContainer staggerDelay={0.1}>
                {contactInfo.map((item, index) => (
                  <StaggerItem key={item.label} animation="slide-right" delay={index * 0.1}>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-background-elevated/50 border border-border/50 hover:border-border-light transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                        <item.icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="font-ui text-caption text-foreground/50 uppercase tracking-wider">{item.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.copyable ? (
                            <>
                              <span className="font-ui text-body-md text-foreground font-mono" onClick={() => handleCopy(item.label, item.value)} style={{ cursor: 'pointer' }}>
                                {item.value}
                              </span>
                              <button
                                onClick={() => handleCopy(item.label, item.value)}
                                className="p-1.5 rounded-lg text-foreground/40 hover:text-accent hover:bg-accent/10 transition-colors"
                                aria-label={copiedField === item.label ? 'Copied!' : `Copy ${item.label}`}
                              >
                                {copiedField === item.label ? (
                                  <Check className="w-4 h-4 text-accent" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </>
                          ) : (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-ui text-body-md text-accent hover:underline">
                              {item.value}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={0.5}>
              <div className="flex flex-wrap gap-4 pt-8">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Twitter
                </a>
              </div>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="slide-up" delay={0.4}>
            <Card variant="elevated">
              <CardContent className="p-8">
                <h3 className="font-display text-heading-md text-foreground mb-6">Send a Message</h3>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="font-display text-heading-md text-foreground mb-2">Message Sent!</h4>
                      <p className="font-ui text-body-md text-foreground/60 mb-6">
                        Thanks for reaching out. I'll get back to you as soon as possible.
                      </p>
                      <Button variant="ghost" onClick={() => setSubmitStatus('idle')}>
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                      noValidate
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Name"
                          placeholder="Your name"
                          error={errors.name?.message}
                          {...register('name')}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="your@email.com"
                          error={errors.email?.message}
                          {...register('email')}
                        />
                      </div>

                      <Input
                        label="Subject"
                        placeholder="Project inquiry, collaboration, etc."
                        error={errors.subject?.message}
                        {...register('subject')}
                      />

                      <Textarea
                        label="Message"
                        placeholder="Tell me about your project, timeline, budget, or just say hi..."
                        rows={5}
                        error={errors.message?.message}
                        {...register('message')}
                      />

                      <Button type="submit" className="w-full" isLoading={submitStatus === 'submitting'}>
                        {submitStatus === 'submitting' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" aria-hidden="true" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-body-sm text-foreground/40">
                        By submitting, you agree to share your info for project communication only.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}