import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Typed interface for project data — ensures consistency across components
// and catches missing or mistyped fields at compile time.
export interface Project {
  id: string
  title: string
  summary: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  status: 'complete' | 'in-progress'
  featured: boolean
}

// Pinia store using the Composition API setup syntax (preferred over Options syntax in Vue 3).
// Exposes project data, tag filtering state, and derived computed values.
export const useProjectsStore = defineStore('projects', () => {

  // Currently active tag filter — null means no filter applied (show all projects)
  const activeTag = ref<string | null>(null)

  // Project data is defined here rather than fetched from an API,
  // keeping the store self-contained and avoiding unnecessary network dependencies
  // for static portfolio content.
  const projects = ref<Project[]>([
    {
      id: 'cupscope',
      title: 'CupScope',
      summary: 'An GraphQL API explorer built with Vue 3 and TypeScript.',
      description: 'CupScope allows developers to browse public GraphQL APIs, inspect schemas, and run live queries. Built with Vue 3, TypeScript, and Pinia for state management.',
      tags: ['Vue 3', 'GraphQL', 'TypeScript', 'Pinia', 'API'],
      status: 'complete',
      featured: true,
    },
    {
      id: 'restboard',
      title: 'RESTboard',
      summary: 'A lightweight REST API testing dashboard.',
      description: 'A browser-based tool for testing REST endpoints, inspecting responses, and saving request history. Inspired by Postman but minimal and fast.',
      tags: ['Vue 3', 'TypeScript', 'REST API'],
      status: 'in-progress',
      featured: false,
    },
    {
      id: 'datapulse',
      title: 'DataPulse',
      summary: 'Real-time data visualization dashboard.',
      description: 'A dashboard that connects to public data APIs and visualizes metrics using interactive charts. Demonstrates reactive data handling and component composition.',
      tags: ['Vue 3', 'TypeScript', 'Charts', 'API'],
      status: 'in-progress',
      featured: false,
    },
  ])

  // Derived list of projects filtered by the active tag.
  // Automatically recomputes whenever activeTag or projects changes.
  const filteredProjects = computed(() =>
    activeTag.value
      ? projects.value.filter(p => p.tags.includes(activeTag.value!))
      : projects.value
  )

  // Derives a unique, flat list of all tags across all projects.
  // Used to populate the filter chip group in ProjectsView.
  const allTags = computed(() =>
    [...new Set(projects.value.flatMap(p => p.tags))]
  )

  // Toggles the active tag filter — clicking an already-active tag clears the filter.
  function setTag(tag: string | null) {
    activeTag.value = activeTag.value === tag ? null : tag
  }

  return { projects, filteredProjects, allTags, activeTag, setTag }
})
