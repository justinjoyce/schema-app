<template>
  <!--
    fill-height makes the container take up the full viewport height,
    centering the hero content vertically on the page.
  -->
  <v-container class="fill-height" fluid>

    <!-- Hero section — centered intro with CTA buttons -->
    <v-row align="center" justify="center" class="text-center py-16">
      <v-col cols="12" md="8">
        <!--
          Avatar uses the first initial as a placeholder.
          Can be swapped for a v-img with a real photo if desired.
        -->
        <v-avatar color="primary" size="96" class="mb-6">
          <span class="text-h4 font-weight-bold">JJ</span>
        </v-avatar>
        <h1 class="text-h3 font-weight-bold mb-4">Hi, I'm Justin</h1>
        <p class="text-h6 text-medium-emphasis mb-8">
          A full Stack developer capable of building clean, performant web applications in Vue 3, TypeScript, and GraphQL.
        </p>
        <v-row justify="center" gap="4">
          <v-col cols="auto">
            <v-btn to="/projects" color="primary" size="large" variant="elevated">
              View My Projects
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn href="https://github.com/justinjoyce/schema-app" target="_blank" size="large" variant="outlined">
              View Project Repo
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--
      Skill highlight cards — a quick visual summary of core competencies.
      Defined as a static array in script setup for easy editing.
      Icons use the MDI icon set bundled with Vuetify via @mdi/font.
    -->
    <v-row justify="center" class="pb-16">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="4" v-for="skill in skills" :key="skill.title">
            <v-card rounded="lg" elevation="2" class="text-center pa-6">
              <v-icon :icon="skill.icon" color="primary" size="40" class="mb-3" />
              <h3 class="text-h6 font-weight-bold mb-2">{{ skill.title }}</h3>
              <p class="text-body-2 text-medium-emphasis">{{ skill.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

// Skill highlight data — drives the card grid in the hero section.
// Kept in script setup rather than the Pinia store as it's
// presentational data local to this view only.
const skills = [
  {
    icon: 'mdi-vuejs',
    title: 'Vue 3 + TypeScript',
    desc: 'Component-driven UIs with the Composition API and full type safety.',
  },
  {
    icon: 'mdi-graph',
    title: 'GraphQL',
    desc: 'Designing and consuming GraphQL APIs with schema-first development.',
  },
  {
    icon: 'mdi-responsive',
    title: 'Responsive Design',
    desc: 'Mobile-first layouts using Vuetify and modern CSS.',
  },
]
</script>
