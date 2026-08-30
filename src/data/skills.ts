export interface Skill {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'design' | 'tools'
  proficiency: number // 0-100
  description?: string
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'react', category: 'frontend', proficiency: 95, description: 'Building modern, component-driven UIs with hooks and context' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', proficiency: 90, description: 'Type-safe JavaScript for scalable applications' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', proficiency: 85, description: 'Full-stack React framework with SSR/SSG' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend', proficiency: 95, description: 'Utility-first CSS for rapid, consistent styling' },
  { name: 'Framer Motion', icon: 'framer', category: 'frontend', proficiency: 85, description: 'Production-ready animations and transitions' },
  { name: 'Vue.js', icon: 'vue', category: 'frontend', proficiency: 75, description: 'Progressive framework for building UIs' },
  { name: 'Vite', icon: 'vite', category: 'frontend', proficiency: 90, description: 'Lightning-fast build tool and dev server' },
  { name: 'HTML5/CSS3', icon: 'html5', category: 'frontend', proficiency: 98, description: 'Semantic markup and modern CSS features' },
  { name: 'JavaScript (ES6+)', icon: 'javascript', category: 'frontend', proficiency: 95, description: 'Modern JavaScript with async/await, modules, etc.' },

  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', proficiency: 85, description: 'JavaScript runtime for server-side development' },
  { name: 'Express.js', icon: 'express', category: 'backend', proficiency: 80, description: 'Minimalist web framework for Node.js' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'backend', proficiency: 75, description: 'Advanced open-source relational database' },
  { name: 'MongoDB', icon: 'mongodb', category: 'backend', proficiency: 70, description: 'Flexible document-based NoSQL database' },
  { name: 'Prisma', icon: 'prisma', category: 'backend', proficiency: 70, description: 'Type-safe database ORM' },
  { name: 'REST APIs', icon: 'api', category: 'backend', proficiency: 90, description: 'Designing and consuming RESTful services' },
  { name: 'GraphQL', icon: 'graphql', category: 'backend', proficiency: 65, description: 'Query language for flexible data fetching' },

  // Design
  { name: 'Figma', icon: 'figma', category: 'design', proficiency: 90, description: 'Collaborative interface design and prototyping' },
  { name: 'Adobe XD', icon: 'adobexd', category: 'design', proficiency: 75, description: 'UX/UI design and prototyping tool' },
  { name: 'UI/UX Design', icon: 'design', category: 'design', proficiency: 85, description: 'User-centered design principles and processes' },
  { name: 'Design Systems', icon: 'components', category: 'design', proficiency: 80, description: 'Building scalable component libraries' },
  { name: 'Responsive Design', icon: 'layout', category: 'design', proficiency: 95, description: 'Mobile-first, fluid layouts across devices' },
  { name: 'Motion Design', icon: 'motion', category: 'design', proficiency: 80, description: 'Micro-interactions and meaningful animations' },

  // Tools
  { name: 'Git/GitHub', icon: 'github', category: 'tools', proficiency: 95, description: 'Version control and collaborative workflows' },
  { name: 'VS Code', icon: 'vscode', category: 'tools', proficiency: 98, description: 'Primary IDE with extensive extensions' },
  { name: 'Docker', icon: 'docker', category: 'tools', proficiency: 65, description: 'Containerization for consistent environments' },
  { name: 'CI/CD', icon: 'ci', category: 'tools', proficiency: 75, description: 'GitHub Actions, Vercel, Netlify pipelines' },
  { name: 'Testing', icon: 'test', category: 'tools', proficiency: 70, description: 'Vitest, React Testing Library, Playwright' },
  { name: 'Figma DevMode', icon: 'figma', category: 'tools', proficiency: 85, description: 'Design-to-code handoff workflow' },
]

export const skillCategories = [
  { id: 'frontend', label: 'Frontend', icon: 'code' },
  { id: 'backend', label: 'Backend', icon: 'server' },
  { id: 'design', label: 'Design', icon: 'palette' },
  { id: 'tools', label: 'Tools', icon: 'wrench' },
] as const

export type SkillCategory = typeof skillCategories[number]['id']