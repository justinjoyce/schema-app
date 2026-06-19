<template>
  <div>

    <!--
      Route-aware rendering: if the project ID is 'schemascore', render the live
      CupScope GraphQL explorer instead of the generic project detail layout.
      This keeps the router simple while allowing a featured project to have
      a fully custom view.
    -->
    <CupScope v-if="route.params.id === 'cupscope'" />

    <v-container v-else class="py-12">
      <v-btn to="/projects" variant="text" color="primary" prepend-icon="mdi-arrow-left" class="mb-6">
        Back to Projects
      </v-btn>

      <template v-if="project">
        <h1 class="text-h4 font-weight-bold mb-2">{{ project.title }}</h1>
        <p class="text-medium-emphasis mb-6">{{ project.summary }}</p>

        <!-- Tag chips derived from the Pinia store project data -->
        <v-chip
          v-for="tag in project.tags"
          :key="tag"
          color="primary"
          variant="tonal"
          class="mr-2 mb-4"
        >
          {{ tag }}
        </v-chip>

        <!-- Status badge — driven by the 'status' field on the Project interface -->
        <v-chip
          :color="project.status === 'complete' ? 'success' : 'warning'"
          variant="tonal"
          :prepend-icon="project.status === 'complete' ? 'mdi-check-circle' : 'mdi-clock-outline'"
          class="mr-2 mb-4"
        >
          {{ project.status === 'complete' ? 'Complete' : 'In Progress' }}
        </v-chip>

        <v-card rounded="lg" elevation="2" class="pa-6 mb-6">
          <p class="text-body-1">{{ project.description }}</p>
        </v-card>

        <v-row>
          <v-col cols="auto" v-if="project.github">
            <v-btn :href="project.github" target="_blank" color="primary" prepend-icon="mdi-github" variant="elevated">
              View on GitHub
            </v-btn>
          </v-col>
          <v-col cols="auto" v-if="project.demo">
            <v-btn :href="project.demo" target="_blank" prepend-icon="mdi-open-in-new" variant="outlined">
              Live Demo
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <!-- Fallback if the project ID doesn't match any entry in the store -->
      <v-alert v-else type="error" title="Project not found" text="This project doesn't exist." />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import CupScope from '../components/CupScope.vue'

const route = useRoute()
const store = useProjectsStore()

// Look up the current project by matching the route :id param against store data.
// Returns undefined if no match, triggering the "not found" alert in the template.
const project = computed(() =>
  store.projects.find(p => p.id === route.params.id)
)
</script>