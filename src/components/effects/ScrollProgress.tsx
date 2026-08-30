import { useScrollPosition } from '@/hooks/useIntersectionObserver'

export function ScrollProgress() {
  const scrollY = useScrollPosition()

  const progress = Math.min(
    (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
    100
  )

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-accent to-warm origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left center',
        }}
      />
    </div>
  )
}