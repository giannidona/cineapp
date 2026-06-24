<template>
  <div
    class="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:-translate-y-1 transition-transform duration-200"
  >
    <!-- Botón favorito -->
    <button
      @click.prevent="toggleFavorite(movie)"
      class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
      :class="
        isFavorite(movie.id)
          ? 'bg-yellow-400 text-zinc-950'
          : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
      "
    >
      {{ isFavorite(movie.id) ? "★" : "☆" }}
    </button>

    <RouterLink :to="`/movie/${movie.id}`" class="block">
      <!-- Poster -->
      <div class="relative aspect-2/3 bg-zinc-800">
        <img
          v-if="posterUrl"
          :src="posterUrl"
          :alt="movie.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-4xl"
        >
          🎬
        </div>

        <!-- Rating -->
        <div
          class="absolute top-2 left-2 bg-black/80 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded"
        >
          ★ {{ movie.vote_average?.toFixed(1) }}
        </div>
      </div>

      <!-- Info -->
      <div class="p-3">
        <h3 class="text-sm font-semibold text-zinc-100 line-clamp-2">
          {{ movie.title }}
        </h3>
        <p class="text-xs text-zinc-500 mt-1">
          {{ movie.release_date?.slice(0, 4) }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useTMDB } from "../composables/useTMDB";
import { useFavorites } from "../composables/useFavorites";

const props = defineProps({ movie: Object });
const { getPosterUrl } = useTMDB();
const { toggleFavorite, isFavorite } = useFavorites();
const posterUrl = computed(() => getPosterUrl(props.movie.poster_path, "w342"));
</script>
