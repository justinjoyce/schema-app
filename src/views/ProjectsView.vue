<template>
  <v-container class="py-12">
    <h1 class="text-h4 font-weight-bold mb-2">Projects</h1>
    <p class="text-medium-emphasis mb-6">A selection of things I've built and would like to build.</p>

    <!--
      Tag filter chip group — allTags is derived from project data in the Pinia store,
      so it automatically updates if projects are added or tags change.
      Clicking a chip calls store.setTag() which updates activeTag in the store,
      triggering filteredProjects to recompute reactively.
      Clicking an active tag a second time clears the filter (toggle behaviour).
    -->
    <v-chip-group v-model="selectedTag" class="mb-8">
      <v-chip
        v-for="tag in store.allTags"
        :key="tag"
        :value="tag"
        filter
        variant="outlined"
        color="primary"
        @click="store.setTag(tag)"
      >
        {{ tag }}
      </v-chip>
    </v-chip-group>

    <!--
      filteredProjects is a computed value from the Pinia store.
      The card grid automatically re-renders when the active tag filter changes.
    -->
    <v-row>
      <v-col
        v-for="project in store.filteredProjects"
        :key="project.id"
        cols="12" md="4"
      >
        <!--
          height="100%" combined with d-flex flex-column ensures all cards
          in a row are equal height regardless of content length.
        -->
        <v-card rounded="lg" elevation="2" height="100%" class="d-flex flex-column">
          <v-card-item>
            <v-card-title class="font-weight-bold">{{ project.title }}</v-card-title>
            <v-card-subtitle>{{ project.summary }}</v-card-subtitle>
          </v-card-item>
          <v-card-text class="flex-grow-1">
            <v-chip
              v-for="tag in project.tags"
              :key="tag"
              size="small"
              color="primary"
              variant="tonal"
              class="mr-1 mb-1"
            >
              {{ tag }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <!--
              'View Details' is only shown for completed projects.
              In-progress projects show a warning chip instead,
              driven by the 'status' field on the Project interface in the store.
            -->
            <v-btn
              v-if="project.status === 'complete'"
              :to="`/projects/${project.id}`"
              variant="text"
              color="primary"
            >
              View Details
            </v-btn>
            <v-chip
              v-else
              color="warning"
              variant="tonal"
              prepend-icon="mdi-clock-outline"
              size="small"
            >
              In Progress
            </v-chip>
            <v-spacer />
            <v-btn v-if="project.github" :href="project.github" target="_blank" icon="mdi-github" variant="text" />
            <v-btn v-if="project.demo" :href="project.demo" target="_blank" icon="mdi-open-in-new" variant="text" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjectsStore } from '../stores/projects'

// Access the Pinia store — filteredProjects and allTags are computed values
// that reactively update when the active tag filter changes.
const store = useProjectsStore()

// Local ref to track the selected chip in the v-chip-group UI.
// The source of truth for filtering logic lives in the store (activeTag).
const selectedTag = ref(null)
</script>
