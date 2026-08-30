import { Briefcase, Globe, MapPin, Mail, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedElement'
import { siteConfig } from '@/data/constants'

export function About() {
  return (
    <>
      <section id="about" className="relative min-h-screen py-20 overflow-hidden" aria-labelledby="about-title">
        <div className="section-container relative z-10">
          <StaggerContainer staggerDelay={0.15} className="text-center">
            <StaggerItem animation="slide-down" delay={0.1}>
              <h2 id="about-title" className="font-display text-display-md text-foreground mb-6">
                About Me
              </h2>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.2}>
              <p className="font-display text-display-sm text-foreground/70 mb-8 max-w-3xl mx-auto">
                I'm a frontend developer and web designer with a passion for crafting visually stunning and
                user-friendly digital experiences. With a strong background in HTML, CSS, JavaScript, and React,
                I help businesses and individuals bring their ideas to life through high-quality web applications,
                websites, and mobile applications.
              </p>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-warm" aria-hidden="true" />
                  <span>Frontend Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span>Web Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-warm" aria-hidden="true" />
                  <span>India</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-8 text-body-sm text-foreground/50">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-warm" aria-hidden="true" />
                  <span>{siteConfig.whatsapp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>Available for freelance & collaborations</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem animation="slide-up" delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Button size="lg" onClick={() => window.open(siteConfig.social.github, '_blank')}>View My GitHub Profile</Button>
                <Button variant="secondary" size="lg" onClick={() => window.open(siteConfig.social.linkedin, '_blank')}>View My LinkedIn Profile</Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}