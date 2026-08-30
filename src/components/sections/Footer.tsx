import { Github, Linkedin, Twitter, Instagram, Mail, Phone, Heart, Code, Palette, Globe } from 'lucide-react'
import { siteConfig, navigation } from '@/data/constants'
import { cn } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Quick Links': navigation.map((item) => ({
      label: item.label,
      href: item.href,
    })),
    'Services': [
      { label: 'Web Design', href: '#' },
      { label: 'Frontend Development', href: '#' },
      { label: 'Full Stack Development', href: '#' },
      { label: 'UI/UX Design', href: '#' },
    ],
    'Connect': [
      { label: 'GitHub', href: siteConfig.social.github, external: true },
      { label: 'LinkedIn', href: siteConfig.social.linkedin, external: true },
      { label: 'Twitter', href: siteConfig.social.twitter, external: true },
      { label: 'Instagram', href: siteConfig.social.instagram, external: true },
    ],
  }

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
  }

  return (
    <footer className="relative border-t border-border/50" role="contentinfo">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <div className="lg:col-span-1">
            <a href="#hero" className="font-display text-heading-lg font-bold text-gradient mb-4 inline-block" aria-label="Go to home">
              AMS
            </a>
            <p className="font-ui text-body-md text-foreground/60 mb-6 max-w-xs">
              Crafting bold, creative digital experiences that are visually stunning and tactilely satisfying.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-foreground/50 hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-foreground/50 hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-foreground/50 hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-foreground/50 hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-heading-sm text-foreground mb-4">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {footerLinks['Quick Links'].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault()
                          const element = document.getElementById(link.href.slice(1))
                          if (element) element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="font-ui text-body-md text-foreground/70 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-display text-heading-sm text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-ui text-body-md text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-heading-sm text-foreground mb-4">Contact</h4>
            <address className="not-italic space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 font-ui text-body-md text-foreground/70 hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-ui text-body-md text-foreground/70 hover:text-warm transition-colors"
              >
                <Phone className="w-5 h-5 text-warm flex-shrink-0" aria-hidden="true" />
                <span>{siteConfig.whatsapp}</span>
              </a>
              <div className="flex items-center gap-3 font-ui text-body-md text-foreground/60">
                <Globe className="w-5 h-5 text-foreground/40 flex-shrink-0" aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-ui text-body-sm text-foreground/50 text-center md:text-left">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-body-sm text-foreground/50">
              <Code className="w-4 h-4" aria-hidden="true" />
              <span>Built with React, TypeScript & Tailwind CSS</span>
              <Heart className="w-4 h-4 text-warm" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}