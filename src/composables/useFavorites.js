import { ref } from "vue";

const STORAGE_KEY = "cineapp_favorites";
const favorites = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value));
}

export function useFavorites() {
  function addFavorite(movie) {
    if (!isFavorite(movie.id)) {
      favorites.value.push(movie);
      save();
    }
  }

  function removeFavorite(id) {
    favorites.value = favorites.value.filter((m) => m.id !== id);
    save();
  }

  function toggleFavorite(movie) {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  }

  function isFavorite(id) {
    return favorites.value.some((m) => m.id === id);
  }

  return { favorites, toggleFavorite, isFavorite };
}
