<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <h2 class="text-lg font-semibold text-zinc-100 mb-5">★ Mis favoritos</h2>

    <!-- Empty -->
    <div v-if="favorites.length === 0" class="text-center py-20 text-zinc-500">
      <p class="text-4xl mb-3">🎬</p>
      <p class="text-sm">No tenés películas guardadas todavía</p>
    </div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <MovieCard v-for="movie in favorites" :key="movie.id" :movie="movie" />
    </div>
  </main>
</template>

<script setup>
import { useFavorites } from "../composables/useFavorites";
import MovieCard from "../components/MovieCard.vue";

const { favorites } = useFavorites();
</script>
