<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import MediaPlayer from "@/components/MediaPlayer.vue";
</script>

<template>
  <!-- header -->
  <div class="bg-gray-100">
    <div class="flex h-screen">
      <Sidebar />
      <main class="grow overflow-y-auto"><router-view></router-view></main>
      <MediaPlayer />
    </div>
  </div>
</template>
