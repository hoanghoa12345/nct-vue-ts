<script setup lang="ts">
import { PlayCircleIcon } from "@heroicons/vue/24/solid";
defineProps<{
  title: string;
}>();
</script>
<template>
  <div>
    <div
      class="group w-36 h-36 md:w-48 md:h-48 shadow-md relative bg-blue-300 rounded-md mx-3 my-2"
    >
      <button
        type="button"
        class="hidden absolute group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <PlayCircleIcon class="w-10 h-10 text-gray-50 hover:scale-125" />
      </button>
    </div>
    <span class="mx-2">{{ title }}</span>
  </div>
</template>
