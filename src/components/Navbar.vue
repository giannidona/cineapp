<template>
  <nav
    class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm"
  >
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
      <RouterLink
        to="/"
        class="text-lg font-bold tracking-tight text-yellow-400"
      >
        ◆ CINEAPP
      </RouterLink>

      <div class="flex items-center gap-6">
        <RouterLink
          to="/"
          class="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Inicio
        </RouterLink>
        <RouterLink
          to="/favorites"
          class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ★ Favoritos
          <span
            v-if="favorites.length > 0"
            class="text-xs bg-yellow-400 text-zinc-950 font-bold px-1.5 py-0.5 rounded-full"
          >
            {{ favorites.length }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useFavorites } from "../composables/useFavorites";

const { favorites } = useFavorites();
</script>
