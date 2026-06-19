// Core Vue imports
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify — Material Design component library for Vue 3
// Importing all components and directives for simplicity in a portfolio context.
// In a production app, tree-shaking via vite-plugin-vuetify would reduce bundle size.
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// urql — lightweight GraphQL client with first-class Vue 3 Composition API support.
// Chosen over Apollo Client for its simplicity; sufficient for this use case.
import { createClient, provideClient, cacheExchange, fetchExchange } from '@urql/vue'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({ components, directives })

// Configure urql with cacheExchange (in-memory cache) and fetchExchange (HTTP requests).
// Points to the public Countries GraphQL API — no auth token required.
const urqlClient = createClient({
  url: 'https://countries.trevorblades.com',
  exchanges: [cacheExchange, fetchExchange],
})

const app = createApp(App)

app.use(createPinia())  // Register Pinia for global state management
app.use(router)         // Register Vue Router for client-side navigation
app.use(vuetify)        // Register Vuetify globally

// Provide the urql client to the entire component tree via Vue's provide/inject system
provideClient(urqlClient)

app.mount('#app')