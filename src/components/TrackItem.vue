<script setup lang="ts">
import { Playlist } from "@/types";
import { PlayCircleIcon } from "@heroicons/vue/24/solid";
import usePlayer from "@/composables/player";
defineProps<{
  playlist: Playlist;
}>();
const player = usePlayer();
const { playPlaylist } = player;
</script>
<template>
  <div>
    <div
      class="group w-36 h-36 md:w-48 md:h-48 shadow-md relative bg-black overflow-hidden rounded-md mx-3 my-2"
    >
      <img
        class="w-full h-full group-hover:opacity-80 group-hover:scale-110 duration-300"
        :src="playlist.image"
        :alt="playlist.name"
      />
      <button
        @click="playPlaylist({ _id: playlist._id })"
        type="button"
        class="hidden absolute group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <PlayCircleIcon class="w-10 h-10 text-gray-50 hover:scale-125" />
      </button>
    </div>
    <span class="mx-2">{{ playlist.name }}</span>
  </div>
</template>
