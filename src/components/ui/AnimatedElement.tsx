import { forwardRef, useRef, ReactNode, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export interface AnimatedElementProps {
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in' | 'blur-in'
  delay?: number
  duration?: number
  triggerOnce?: boolean
  className?: string
  children?: ReactNode
}

const animationVariants = {
  'fade-in': { initial: { opacity: 0 }, animate: { opacity: 1 } },
  'slide-up': { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  'slide-down': { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  'slide-left': { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
  'slide-right': { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
  'scale-in': { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
  'blur-in': { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0)' } },
}

export const AnimatedElement = forwardRef<HTMLElement, AnimatedElementProps>(
  ({ className, animation = 'slide-up', delay = 0, duration = 0.6, triggerOnce = true, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const [elementRef, isInView] = useIntersectionObserver({ triggerOnce })

    const combinedRef = useRef<HTMLElement | null>(null)
    const setRef = (node: HTMLElement | null) => {
      combinedRef.current = node
      if (ref) {
        if (typeof ref === 'function') ref(node)
        else ref.current = node
      }
      elementRef.current = node
    }

    if (prefersReducedMotion) {
      return <div ref={setRef} className={cn('opacity-100', className)} {...props}>{children}</div>
    }

    const variant = animationVariants[animation]
    const transition = { duration, delay, ease: [0.16, 1, 0.3, 1] }

    return (
      <motion.div
        ref={setRef}
        initial={variant.initial}
        animate={isInView ? variant.animate : variant.initial}
        transition={transition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedElement.displayName = 'AnimatedElement'

export interface StaggerContainerProps extends HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number
  animation?: AnimatedElementProps['animation']
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ className, staggerDelay = 0.1, animation = 'slide-up', children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const [elementRef, isInView] = useIntersectionObserver({ triggerOnce: true })

    const combinedRef = useRef<HTMLDivElement | null>(null)
    const setRef = (node: HTMLDivElement | null) => {
      combinedRef.current = node
      if (ref) {
        if (typeof ref === 'function') ref(node)
        else ref.current = node
      }
      elementRef.current = node
    }

    if (prefersReducedMotion) {
      return (
        <div ref={setRef} className={cn('opacity-100', className)} {...props}>
          {typeof children === 'function' ? children(true) : children}
        </div>
      )
    }

    return (
      <motion.div
        ref={setRef}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: staggerDelay } },
        }}
        className={cn(className)}
        {...props}
      >
        {typeof children === 'function' ? children(isInView) : children}
      </motion.div>
    )
  }
)

StaggerContainer.displayName = 'StaggerContainer'

export const StaggerItem = forwardRef<HTMLDivElement, AnimatedElementProps>(
  ({ className, animation = 'slide-up', delay = 0, duration = 0.5, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()

    const variant = animationVariants[animation]
    const transition = { duration, delay, ease: [0.16, 1, 0.3, 1] }

    if (prefersReducedMotion) {
      return <div ref={ref} className={cn('opacity-100', className)} {...props}>{children}</div>
    }

    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: variant.initial,
          visible: { ...variant.animate, transition },
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

StaggerItem.displayName = 'StaggerItem'