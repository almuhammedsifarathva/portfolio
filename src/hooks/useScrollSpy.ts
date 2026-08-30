import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[]) {
  const [currentSectionId, setCurrentSectionId] = useState(sectionIds[0])

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sectionIds.find((id) => {
        const sectionElement = document.getElementById(id)
        if (!sectionElement) return false
        const rect = sectionElement.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })
      if (currentSection) setCurrentSectionId(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return currentSectionId
}