# Justin Joyce | TechFolio

A polished single-page application (SPA) built with Vue 3, TypeScript, and Vuetify — developed as a portfolio project to demonstrate modern frontend development practices.

**Live Demo:** https://schema.livetesting.ca

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| UI Library | Vuetify 3 (Material Design) |
| State Management | Pinia |
| Routing | Vue Router 4 |
| GraphQL Client | @urql/vue |
| Build Tool | Vite |
| Linting | ESLint + Prettier |
| Server | Apache on Ubuntu 24.04 (DigitalOcean) |

---

## Features

### Multi-page SPA with Vue Router
Five routes demonstrating both static and dynamic routing:

- `/` — Hero landing page with skill highlights
- `/projects` — Filterable project card grid
- `/projects/:id` — Dynamic project detail pages
- `/about` — Skills grid and experience timeline
- `/contact` — Frontend-validated contact form (UI only)

### Pinia State Management
A centralized `projects` store manages:
- Project data with typed TypeScript interfaces
- Active tag filter state
- Computed filtered project list
- All tags derived dynamically from project data

### FifaScope — Live GraphQL Explorer
The featured project at `/projects/schemascore` is a working GraphQL explorer built inside the app itself:
- Queries the [Countries GraphQL API](https://countries.trevorblades.com) via `@urql/vue`
- Displays country cards with flag emoji, capital, currency, languages, and continent
- Real-time search filtering by country name or capital
- Enriched with static FIFA World Rankings data, demonstrating a hybrid data pattern (live API + local static data)
- Skeleton loaders during fetch, empty state handling, and error state handling

### TypeScript Throughout
- Typed `Project` interface in the Pinia store
- Typed component props and computed properties
- Strict type checking via `vue-tsc`

---

## Project Structure

```
src/
├── assets/
├── components/
│   └── FifaScope.vue        # GraphQL country explorer component
├── data/
│   └── fifaRankings.ts      # Static FIFA World Rankings (top 50)
├── router/
│   └── index.ts             # Vue Router configuration
├── stores/
│   └── projects.ts          # Pinia store — project data and tag filtering
├── views/
│   ├── HomeView.vue          # Landing page
│   ├── ProjectsView.vue      # Project grid with tag filter chips
│   ├── ProjectDetail.vue     # Dynamic detail view / FifaScope renderer
│   └── AboutView.vue         # Skills and experience
├── App.vue                   # Root layout — nav bar and footer
└── main.ts                   # App entry — Vuetify, Pinia, Router, urql setup
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Install and run locally
```bash
git clone https://github.com/justin-joyce/schema-app.git
cd schema-app
npm install
npm run dev
```

### Build for production
```bash
npm run build
```

Output is generated in `dist/`. Deploy by copying to your web server root.

---

## Deployment

Deployed on a DigitalOcean Ubuntu 24.04 droplet running Apache 2.4. The `public/.htaccess` file handles SPA routing — all requests fall back to `index.html` so Vue Router can manage client-side navigation.

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Design Decisions

**Why Vuetify?** Material Design components accelerate UI development while maintaining a consistent, professional look. Vuetify 3's deep Vue 3 integration makes it a natural pairing for this stack.

**Why urql over Apollo?** `@urql/vue` is lightweight, has first-class Vue 3 Composition API support, and is sufficient for this use case without the overhead of Apollo Client.

**Why hybrid data for FIFA rankings?** No public GraphQL API provides FIFA ranking data. Rather than omitting the feature, a static data file was used to enrich the live API results — a practical pattern used in production when third-party data sources are incomplete or unavailable.

---

## Author

**Justin Joyce**
- LinkedIn: [linkedin.com/in/justin-gregory-joyce](https://www.linkedin.com/in/justin-gregory-joyce/)
- Live: [schema.livetesting.ca](https://schema.livetesting.ca)
