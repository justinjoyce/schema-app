import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// createWebHistory enables clean URLs (e.g. /about) instead of hash-based URLs (e.g. /#/about).
// Requires the Apache .htaccess rewrite rule to fall back to index.html on direct URL access or refresh.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // HomeView is eagerly loaded — it's the entry point and should be immediately available.
      path: '/',
      component: HomeView,
    },
    {
      // Remaining routes are lazy-loaded via dynamic import().
      // Vite code-splits these into separate chunks, reducing the initial bundle size.
      // Each chunk is only downloaded when the user navigates to that route.
      path: '/projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      // Dynamic route — :id is matched against project IDs in the Pinia store.
      // ProjectDetail.vue uses this param to look up the correct project,
      // or render the FifaScope GraphQL explorer for the 'schemascore' project.
      path: '/projects/:id',
      component: () => import('../views/ProjectDetail.vue'),
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router