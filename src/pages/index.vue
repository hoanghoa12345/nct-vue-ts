<template>
  <div v-if="loading" class="mx-2 my-4">
    <div class="w-full h-56 rounded-lg md:h-96 bg-gray-200 animate-pulse"></div>
  </div>
  <Carousel :items="items" v-else />
  <div v-if="loadPlaylist" v-for="n in 3" class="animate-pulse">
    <div class="h-4 bg-gray-200 w-52 rounded-full mx-4 mt-4" />
    <div class="flex overflow-hidden">
      <div v-for="n in 6" class="my-2">
        <div class="h-48 w-48 bg-gray-200 rouned-lg m-4" />
        <div class="h-2.5 bg-gray-200 w-48 rounded-full mx-4" />
      </div>
    </div>
  </div>
  <Playlist
    v-else
    v-for="collection in collections"
    :title="collection.title"
    :playlists="collection.playlists"
  />
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Carousel from "@/components/Carousel.vue";
import Playlist from "@/components/Playlist.vue";
import { fetchCarousels, fetchAllCollections } from "@/api";
import { CarouselItem, Collection } from "@/types";
const items = ref<Array<CarouselItem>>([]);
const collections = ref<Array<Collection>>([]);
const loading = ref<boolean>(false);
const loadPlaylist = ref<boolean>(false);

async function loadCollections() {
  loadPlaylist.value = true;
  const res = await fetchAllCollections();

  if (res && Array.isArray(res)) {
    collections.value = res;
  }
  loadPlaylist.value = false;
}

async function loadCarousel() {
  loading.value = true;
  const res = await fetchCarousels();

  if (res && Array.isArray(res)) {
    items.value.push(...res);
  }
  loading.value = false;
}
onMounted(() => {
  loadCarousel();
  loadCollections();
});
</script>
