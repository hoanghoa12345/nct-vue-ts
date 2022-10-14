<script setup lang="ts">
import { ref, watch } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import TrackItem from "@/components/TrackItem.vue";
import { Playlist } from "@/types";
const props = defineProps({
  title: String,
  playlists: { type: Array<Playlist>, required: true },
});

const carousel = ref<HTMLElement>();
let slickItem = 4;
const maxCount = Math.ceil(props.playlists.length / slickItem);

const current = ref(0);

function handleNext() {
  current.value++;
}

function handlePrev() {
  current.value--;
}

watch(current, (i) => {
  if (carousel.value != null) {
    carousel.value.scrollLeft = i * carousel.value.offsetWidth;
  }
});
</script>
<template>
  <div class="mx-4 my-8">
    <div class="flex justify-between items-center">
      <h2 class="font-bold text-2xl mx-2 my-2">{{ title }}</h2>
      <div>
        <button
          type="button"
          @click="handlePrev"
          :disabled="current < 1"
          class="text-gray-500 disabled:text-gray-300 hover:text-blue-500"
        >
          <ChevronLeftIcon class="w-5 h-6" />
        </button>
        <button
          type="button"
          @click="handleNext"
          :disabled="current + 1 > maxCount"
          class="text-gray-500 disabled:text-gray-300 hover:text-blue-500"
        >
          <ChevronRightIcon class="w-5 h-6" />
        </button>
      </div>
    </div>
    <div class="relative overflow-hidden" ref="carousel">
      <div class="flex">
        <TrackItem
          :playlist="item"
          v-for="(item, index) in playlists"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
