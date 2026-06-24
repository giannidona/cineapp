const BASE = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const LANG = "es-ES";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export function useTMDB() {
  async function getPopular(page = 1) {
    const res = await fetch(
      `${BASE}/movie/popular?language=${LANG}&page=${page}`,
      { headers },
    );
    return res.json();
  }

  async function searchMovies(query, page = 1) {
    const res = await fetch(
      `${BASE}/search/movie?query=${encodeURIComponent(query)}&language=${LANG}&page=${page}`,
      { headers },
    );
    return res.json();
  }

  async function getGenres() {
    const res = await fetch(`${BASE}/genre/movie/list?language=${LANG}`, {
      headers,
    });
    return res.json();
  }

  async function getMovie(id) {
    const res = await fetch(`${BASE}/movie/${id}?language=${LANG}`, {
      headers,
    });
    return res.json();
  }

  async function discoverByGenre(genreId, page = 1) {
    const res = await fetch(
      `${BASE}/discover/movie?with_genres=${genreId}&language=${LANG}&page=${page}&sort_by=popularity.desc`,
      { headers },
    );
    return res.json();
  }

  function getPosterUrl(path, size = "w500") {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
  }

  return {
    getPopular,
    searchMovies,
    getGenres,
    getMovie,
    discoverByGenre,
    getPosterUrl,
  };
}
