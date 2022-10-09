<template>
  <div class="relative mx-2 my-4">
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="`${
          index === current ? 'translate-x-0 z-20' : 'z-10 translate-x-full'
        } duration-700 ease-in-out absolute inset-0 transition-all transform`"
      >
        <img
          :src="item"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          alt="slide-item"
        />
      </div>
    </div>
    <div
      class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        type="button"
        @click="handleSelect(index)"
        :class="`w-2 h-2 md:w-3 md:h-3 rounded-full ${
          index === current ? 'bg-blue-500' : 'bg-gray-400'
        } `"
      ></button>
    </div>
    <button
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="handlePrev"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <ChevronLeftIcon
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
        />
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="handleNext"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <ChevronRightIcon
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
        />
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted } from "vue";
const carousel = ref(null);
const current = ref(0);
const items = ref([
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/03/7/5/2/9/1664789595472.jpg",
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/06/9/6/f/2/1665046314326.jpg",
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/06/9/6/f/2/1665071718543.jpg",
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/06/9/6/f/2/1665053988917.jpg",
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/07/2/d/c/4/1665108549637.jpg",
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/07/2/d/c/4/1665141040625.jpg",
  "https://avatar-ex-swe.nixcdn.com/slideshow-web/2022/10/07/2/d/c/4/1665141279703.jpg",
]);
const maxCount = items.value.length;

function handleNext() {
  if (maxCount > current.value + 1) current.value++;
}

function handlePrev() {
  if (current.value > 0) current.value--;
}

function handleSelect(index: number) {
  current.value = index;
}

onMounted(() => {
  setInterval(() => {
    if (current.value > maxCount - 2) {
      current.value = 0;
    } else {
      current.value++;
    }
  }, 3000);
});
</script>
