import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string
  className?: string
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className, children, padding = 'xl', ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'py-12 sm:py-16',
      md: 'py-16 sm:py-20 lg:py-24',
      lg: 'py-20 sm:py-24 lg:py-28',
      xl: 'py-24 sm:py-28 lg:py-32',
    }

    return (
      <section
        ref={ref}
        id={id}
        className={cn('relative', paddings[padding], className)}
        {...props}
      >
        <div className="section-container">{children}</div>
      </section>
    )
  }
)

Section.displayName = 'Section'