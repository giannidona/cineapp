<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <!-- Loading -->
    <div v-if="loading" class="text-zinc-400 text-sm">Cargando...</div>

    <div v-else-if="movie">
      <!-- Back -->
      <button
        @click="$router.back()"
        class="text-sm text-zinc-400 hover:text-white transition-colors mb-6"
      >
        ← Volver
      </button>

      <div class="flex flex-col sm:flex-row gap-8">
        <!-- Poster -->
        <img
          v-if="posterUrl"
          :src="posterUrl"
          :alt="movie.title"
          class="w-full sm:w-64 rounded-xl object-cover"
        />

        <!-- Info -->
        <div class="flex-1 space-y-4">
          <h1 class="text-2xl font-bold text-black">{{ movie.title }}</h1>

          <div class="flex flex-wrap gap-3 text-sm text-zinc-400">
            <span>📅 {{ movie.release_date?.slice(0, 4) }}</span>
            <span>⭐ {{ movie.vote_average?.toFixed(1) }}</span>
            <span>🕐 {{ movie.runtime }} min</span>
          </div>

          <!-- Genres -->
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="genre in movie.genres"
              :key="genre.id"
              class="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-300"
            >
              {{ genre.name }}
            </span>
          </div>

          <!-- Overview -->
          <p class="text-sm text-zinc-400 leading-relaxed">
            {{ movie.overview }}
          </p>

          <!-- Tagline -->
          <p v-if="movie.tagline" class="text-sm italic text-yellow-400">
            "{{ movie.tagline }}"
          </p>

          <!-- Favorito -->
          <button
            @click="toggleFavorite(movie)"
            class="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            :class="
              isFavorite(movie.id)
                ? 'bg-yellow-400 text-zinc-950'
                : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
            "
          >
            {{
              isFavorite(movie.id) ? "★ En favoritos" : "☆ Agregar a favoritos"
            }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTMDB } from "../composables/useTMDB";
import { useFavorites } from "../composables/useFavorites";

const { toggleFavorite, isFavorite } = useFavorites();

const route = useRoute();
const { getMovie, getPosterUrl } = useTMDB();

const movie = ref(null);
const loading = ref(true);

const posterUrl = computed(() =>
  getPosterUrl(movie.value?.poster_path, "w500"),
);

onMounted(async () => {
  const data = await getMovie(route.params.id);
  movie.value = data;
  loading.value = false;
});
</script>
