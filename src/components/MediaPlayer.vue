<template>
  <div
    class="hidden flex-none w-72 border-l-2 border-gray-200 bg-gray-50 lg:flex flex-col justify-between"
  >
    <div class="grow">
      <div class="rouned-md bg-slate-100 mx-auto w-60 mt-8 py-1 rounded">
        <div
          class="border border-gray-300 rounded-lg bg-blue-300 w-52 h-52 mt-2 mx-auto shadow-md"
        ></div>
        <h3 class="font-medium text-sm text-gray-900 mx-4 my-2">
          Nắng ấm ngang qua
        </h3>
        <p class="text-xs text-gray-500 mx-4 my-2">Sơn Tùng M-TP</p>
      </div>
      <span class="text-xs text-gray-500 mx-4 text-center"
        >Playlist: Top Song: Sơn Tùng M-TP</span
      >
    </div>
    <div class="flex-none">
      <div class="flex flex-row justify-between items-center py-2">
        <div class="group relative py-2">
          <div
            class="absolute group-hover:visible invisible bottom-0 h-32 left-1/2 -translate-x-1/2 group-hover:shadow-lg rounded-full w-8"
          >
            <input
              orient="vertical"
              type="range"
              value="50"
              min="1"
              max="100"
              class="vertical-range w-[2px] h-24 bg-gray-200 cursor-pointer mx-4"
            />
          </div>
          <SpeakerWaveIcon class="w-5 h-5 text-gray-500 mx-4" />
        </div>
        <div class="rounded-full bg-gray-100 px-4 py-2">
          <button class="text-xs text-gray-500">Danh sách phát</button>
        </div>
        <button type="button" class="hover:bg-gray-200 rounded-full mx-2">
          <EllipsisVerticalIcon class="w-5 h-5 text-gray-500 mx-2 my-2" />
        </button>
      </div>
      <div class="flex flex-row justify-evenly py-2">
        <div><span class="text-xs text-gray-500 mx-2">00:00</span></div>
        <div>
          <input
            type="range"
            min="1"
            max="100"
            value="1"
            class="w-full h-[2px] bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div><span class="text-xs text-gray-500 mx-2">03:15</span></div>
      </div>
      <div class="flex flex-row justify-evenly items-center py-4">
        <button content="Ngẫu nhiên" v-tippy="{ placement: 'bottom' }">
          <ArrowsRightLeftIcon class="w-5 h-5 text-gray-500" />
        </button>
        <button content="Bài trước" v-tippy="{ placement: 'bottom' }">
          <BackwardIcon class="w-5 h-5 text-gray-500" />
        </button>
        <button content="Phát" v-tippy="{ placement: 'bottom' }">
          <PlayIcon class="w-10 h-10 text-gray-500" />
        </button>
        <button content="Tiếp theo" v-tippy="{ placement: 'bottom' }">
          <ForwardIcon class="w-5 h-5 text-gray-500" />
        </button>
        <button content="Ngẫu nhiên" v-tippy="{ placement: 'bottom' }">
          <ArrowPathIcon class="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div class="text-xs text-gray-500 text-center my-2">
        <span>128Kbps</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SpeakerWaveIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";
import {
  PlayIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/vue/24/solid";
</script>
<style scoped>
.vertical-range {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* Chromium */
}
</style>
