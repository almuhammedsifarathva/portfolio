export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  image: string
  tags: string[]
  category: 'web-design' | 'frontend' | 'fullstack'
}

export const projectCategories = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'web-design', label: 'Web Design' },
  { id: 'frontend', label: 'Frontend App' },
  { id: 'fullstack', label: 'Full Stack Concept' },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Modern E-Commerce Storefront',
    description:
      'A high-converting, mobile-first e-commerce interface featuring dark/light aesthetic, micro-interactions, responsive cart flow, and tactile card hovers.',
    shortDescription: 'Sleek, responsive online store interface engineered for high conversion rates.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Tailwind CSS', 'UI/UX', 'Framer Motion'],
    category: 'frontend',
  },
  {
    id: '2',
    title: 'SaaS Analytics Dashboard Concept',
    description:
      'Data-driven administrative dashboard layout optimized for clear data visualization, custom dark mode, fluid tables, and interactive metric tiles.',
    shortDescription: 'Clean data visualizer layout built for modern cloud platforms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Web Design', 'TypeScript', 'Tailwind CSS', 'Data Viz'],
    category: 'web-design',
  },
  {
    id: '3',
    title: 'Creative Agency Brand Landing Page',
    description:
      'Immersive portfolio & agency landing page incorporating smooth scroll animations, glassmorphism UI elements, and responsive typography.',
    shortDescription: 'Bold, tactile agency landing page crafted to capture high-value clients.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Framer Motion', 'Web Design', 'Responsive'],
    category: 'web-design',
  },
]