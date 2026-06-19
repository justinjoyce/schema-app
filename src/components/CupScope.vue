<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h1 class="text-h4 font-weight-bold mb-2">CupScope</h1>
        <p class="text-medium-emphasis mb-6">
          Explore country data via the Countries GraphQL API, enriched with FIFA World Rankings.
        </p>

        <!-- Real-time search — filters the computed filteredCountries list on every keystroke -->
        <v-text-field
            v-model="search"
            label="Search countries..."
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            clearable
            class="mb-6"
        />

        <v-alert v-if="error" type="error" class="mb-6">
          Failed to load country data.
        </v-alert>

        <!--
          Skeleton loaders shown while the GraphQL query is in flight.
          Provides a better perceived performance experience than a spinner.
        -->
        <v-row v-if="fetching">
          <v-col v-for="n in 6" :key="n" cols="12" md="4">
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>

        <template v-else>
          <p class="text-caption text-medium-emphasis mb-4">
            Showing {{ filteredCountries.length }} result(s)
          </p>

          <v-row>
            <v-col
                v-for="country in filteredCountries"
                :key="country.code"
                cols="12" md="4"
            >
              <v-card rounded="lg" elevation="2" height="100%">
                <v-card-item>
                  <template #prepend>
                    <!-- Emoji flag provided directly by the Countries API -->
                    <span class="text-h4 mr-2">{{ country.emoji }}</span>
                  </template>
                  <v-card-title class="font-weight-bold">{{ country.name }}</v-card-title>
                  <v-card-subtitle>{{ country.capital ?? 'No capital' }}</v-card-subtitle>
                </v-card-item>

                <v-card-text>
                  <v-list density="compact" lines="one">
                    <v-list-item prepend-icon="mdi-cash" :subtitle="country.currency ?? 'N/A'" title="Currency" />
                    <v-list-item
                        prepend-icon="mdi-translate"
                        :subtitle="country.languages.map((l: any) => l.name).join(', ') || 'N/A'"
                        title="Languages"
                    />
                    <v-list-item prepend-icon="mdi-earth" :subtitle="country.continent.name" title="Continent" />
                  </v-list>

                  <!--
                    FIFA ranking lookup — getRanking() matches the country code from the
                    GraphQL response against the local fifaRankings static dataset.
                    This hybrid approach combines live API data with curated local data,
                    a common pattern when no single API provides everything needed.
                  -->
                  <v-chip
                      v-if="getRanking(country.code)"
                      color="amber-darken-2"
                      variant="tonal"
                      prepend-icon="mdi-soccer"
                      class="mt-3"
                  >
                    FIFA Rank #{{ getRanking(country.code) }}
                  </v-chip>
                  <v-chip
                      v-else
                      color="grey"
                      variant="tonal"
                      prepend-icon="mdi-soccer"
                      class="mt-3"
                  >
                    Not FIFA Ranked
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Empty state — shown when search term returns no matches -->
          <v-alert v-if="filteredCountries.length === 0 && !fetching" type="info" class="mt-6">
            No countries found matching "{{ search }}".
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { createClient, cacheExchange, fetchExchange, useQuery, provideClient } from '@urql/vue'
import { fifaRankings } from '../data/fifaRankings'

// Instantiate the urql client scoped to this component via provideClient.
// This approach was chosen over registering globally in main.ts to keep
// the GraphQL dependency self-contained within the feature that uses it.
provideClient(createClient({
  url: 'https://countries.trevorblades.com',
  exchanges: [cacheExchange, fetchExchange],
}))

const search = ref('')

// GraphQL query requesting all fields needed for the country cards.
// The Countries API (countries.trevorblades.com) requires no authentication.
const COUNTRIES_QUERY = `
  query {
    countries {
      code
      name
      capital
      currency
      emoji
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`

// useQuery is urql's Composition API hook — returns reactive refs for data, fetching, and error states.
// The query fires automatically on component mount.
const { data, fetching, error } = useQuery({ query: COUNTRIES_QUERY })

// Derived list of countries filtered by the search term.
// Filters against both country name and capital for broader search coverage.
// Returns all countries when search is empty.
const filteredCountries = computed(() => {
  const countries = data.value?.countries ?? []
  if (!search.value) return countries
  const term = search.value.toLowerCase()
  return countries.filter((c: any) =>
      c.name.toLowerCase().includes(term) ||
      c.capital?.toLowerCase().includes(term)
  )
})

// Looks up a country's FIFA ranking by matching its 2-letter ISO code
// against the local fifaRankings dataset. Returns null if not ranked.
function getRanking(code: string): number | null {
  return fifaRankings.find(r => r.code === code)?.rank ?? null
}
</script>