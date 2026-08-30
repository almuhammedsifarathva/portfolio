import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitText(text: string): string[] {
  return text.split('').map((char, i) => (
    `<span style="--char-index: ${i}; display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
  ))
}

export function formatYear(year: number): string {
  return new Date(year, 0).toLocaleDateString('en-US', { year: 'numeric' })
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function openWhatsApp(phone: string, message?: string) {
  const encodedMessage = message ? encodeURIComponent(message) : ''
  const url = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
  window.open(url, '_blank')
}

export function sendEmail(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams()
  if (subject) params.append('subject', subject)
  if (body) params.append('body', body)
  const url = `mailto:${email}${params.toString() ? `?${params.toString()}` : ''}`
  window.location.href = url
}