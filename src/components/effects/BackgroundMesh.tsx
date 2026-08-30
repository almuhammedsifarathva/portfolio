import { useReducedMotion } from '@/hooks/useReducedMotion'

export function BackgroundMesh() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-background" aria-hidden="true" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--tw-gradient-stops)] from-background via-background to-background" />
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] bg-gradient-to-br from-accent/10 via-transparent to-warm/10 animate-mesh-move rounded-full blur-[200px]" />
      <div className="absolute top-[-10%] right-[-20%] w-[80%] h-[100%] bg-gradient-to-bl from-warm/5 via-transparent to-accent/5 animate-mesh-move rounded-full blur-[150px]" style={{ animationDelay: '-5s' }} />
      <div className="absolute bottom-[-30%] left-[50%] w-[100%] h-[80%] bg-gradient-to-tr from-accent/5 via-transparent to-transparent animate-mesh-move rounded-full blur-[150px]" style={{ animationDelay: '-10s' }} />
    </div>
  )
}