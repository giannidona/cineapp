<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Search -->
    <input
      v-model="query"
      @input="onSearch"
      type="text"
      placeholder="Buscar películas..."
      class="w-full rounded-xl px-4 py-3 text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 outline-none focus:border-yellow-400 transition-colors mb-4"
    />

    <!-- Genres -->
    <div class="flex gap-2 flex-wrap mb-8">
      <button
        @click="selectGenre(null)"
        class="text-xs font-medium rounded-full px-3.5 py-1.5 transition-colors"
        :class="
          selectedGenre === null
            ? 'bg-yellow-400 text-zinc-950'
            : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
        "
      >
        Todos
      </button>
      <button
        v-for="genre in genres"
        :key="genre.id"
        @click="selectGenre(genre.id)"
        class="text-xs font-medium rounded-full px-3.5 py-1.5 transition-colors"
        :class="
          selectedGenre === genre.id
            ? 'bg-yellow-400 text-zinc-950'
            : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
        "
      >
        {{ genre.name }}
      </button>
    </div>

    <h2 class="text-lg font-semibold text-zinc-100 mb-5">
      {{ query ? `Resultados para "${query}"` : "Películas populares" }}
    </h2>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <!-- Paginación -->
    <div class="flex justify-center items-center gap-4 mt-10">
      <button
        @click="changePage(page - 1)"
        :disabled="page === 1"
        class="text-sm px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Anterior
      </button>
      <span class="text-sm text-zinc-500">Página {{ page }}</span>
      <button
        @click="changePage(page + 1)"
        class="text-sm px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
      >
        Siguiente →
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTMDB } from "../composables/useTMDB";
import MovieCard from "../components/MovieCard.vue";

const { getPopular, searchMovies, getGenres, discoverByGenre } = useTMDB();
const movies = ref([]);
const genres = ref([]);
const query = ref("");
const selectedGenre = ref(null);
const page = ref(1);
let searchTimeout = null;

async function loadMovies() {
  if (query.value.trim()) {
    const data = await searchMovies(query.value, page.value);
    movies.value = data.results;
  } else if (selectedGenre.value) {
    const data = await discoverByGenre(selectedGenre.value, page.value);
    movies.value = data.results;
  } else {
    const data = await getPopular(page.value);
    movies.value = data.results;
  }
}

function onSearch() {
  page.value = 1;
  selectedGenre.value = null;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(loadMovies, 400);
}

function selectGenre(id) {
  page.value = 1;
  selectedGenre.value = id;
  query.value = "";
  loadMovies();
}

function changePage(n) {
  page.value = n;
  window.scrollTo({ top: 0, behavior: "smooth" });
  loadMovies();
}

onMounted(async () => {
  const data = await getGenres();
  genres.value = data.genres;
  loadMovies();
});
</script>
