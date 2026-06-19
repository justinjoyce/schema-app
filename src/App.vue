<template>

  <!--
    v-app is required as the root element for Vuetify — it sets up the
    Material Design theme context and layout system for all child components.
  -->
  <v-app>
    <!--
      v-app-bar is a Vuetify layout component that automatically accounts for
      its own height when calculating the v-main content area — no manual
      padding or offset needed.
    -->
    <v-app-bar color="primary" elevation="2">

      <v-app-bar-title>
        <router-link v-if="route.path !== '/'" to="/" style="text-decoration: none; color: inherit;">
          <span class="font-weight-bold">Justin Joyce</span>
          <span class="text-medium-emphasis"> | TechFolio</span>
        </router-link>
        <span v-else>
          <span class="font-weight-bold">Justin Joyce</span>
          <span class="text-medium-emphasis"> | TechFolio</span>
        </span>
      </v-app-bar-title>

      <template #append>
        <!--
          v-btn with 'to' prop integrates directly with Vue Router —
          renders as an <a> tag with active route highlighting built in.
        -->
        <v-btn to="/" variant="text">Home</v-btn>
        <v-btn to="/projects" variant="text">Projects</v-btn>
        <v-btn to="/about" variant="text">About</v-btn>
      </template>
    </v-app-bar>

    <!--
      v-main is the primary content area in Vuetify's layout system.
      It automatically adjusts its padding to account for the app bar and footer,
      ensuring content is never hidden behind fixed layout elements.
    -->
    <v-main>
      <!--
        router-view renders the matched route component.
        As the user navigates, Vue Router swaps the component here
        without a full page reload — this is the core of the SPA pattern.
      -->
      <router-view />
    </v-main>

    <!--
      'app' prop registers the footer with Vuetify's layout system,
      pinning it to the bottom and preventing content overlap.
    -->
    <v-footer app color="primary" class="text-center d-flex justify-center">
      <span class="text-caption">© {{ new Date().getFullYear() }} Justin Joyce. Built with Vue 3 + Vuetify.</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
