<template>
  <div
    class="hidden flex-none w-80 border-l-2 border-gray-200 bg-gray-50 lg:flex flex-col justify-between"
  >
    <div class="grow">
      <div class="rouned-md bg-slate-100 mx-auto w-60 mt-8 py-1 rounded">
        <div
          class="border border-gray-300 rounded-lg bg-blue-300 w-52 h-52 mt-2 mx-auto shadow-md"
        >
          <img
            class="w-full h-full object-cover"
            v-if="currentSong.artwork"
            :src="currentSong.artwork"
            :atl="currentSong.name"
          />
        </div>
        <h3 class="font-medium text-sm text-gray-900 mx-4 my-2">
          {{ currentSong.name }}
        </h3>
        <p class="text-xs text-gray-500 mx-4 my-2">{{ currentSong.artists }}</p>
      </div>
      <span class="text-xs text-gray-500 mx-4 text-center"
        >Playlist: {{ currentPlaylist.name }}</span
      >
    </div>
    <div class="flex-none">
      <div class="flex flex-row justify-between items-center py-2">
        <div class="group relative py-2">
          <div
            class="absolute group-hover:visible invisible bottom-0 h-32 left-1/2 -translate-x-1/2 group-hover:shadow-lg rounded-full w-10"
          >
            <volume-bar v-model:percent="volume" @change="handleChangeVolume" />
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
      <div class="flex flex-row justify-evenly items-center py-2">
        <div>
          <span class="text-xs text-gray-500 mx-2">{{
            displayDuration(duration, 2)
          }}</span>
        </div>
        <progress-bar
          v-model:percent="progress"
          @change="handleChangeDuration"
        />
        <div>
          <span class="text-xs text-gray-500 mx-2">{{
            displayDuration(currentSong.duration, 2)
          }}</span>
        </div>
      </div>
      <div class="flex flex-row justify-evenly items-center py-4">
        <button content="Ngẫu nhiên" v-tippy="{ placement: 'bottom' }">
          <ArrowsRightLeftIcon class="w-5 h-5 text-gray-500" />
        </button>
        <button content="Bài trước" v-tippy="{ placement: 'bottom' }">
          <BackwardIcon class="w-5 h-5 text-gray-500" />
        </button>
        <button
          @click="togglePlay"
          :content="!isPlaying ? 'Phát' : 'Tạm dừng'"
          v-tippy="{ placement: 'bottom' }"
        >
          <PlayIcon v-if="!isPlaying" class="w-10 h-10 text-gray-500" />
          <PauseIcon v-else class="w-10 h-10 text-gray-500" />
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
import { handleError, onMounted, ref, watch, reactive, toRefs } from "vue";
import {
  SpeakerWaveIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/vue/24/solid";
import { displayDuration } from "@/helpers/utils";
import ProgressBar from "@/components/ProgressBar.vue";
import VolumeBar from "@/components/VolumeBar.vue";
import usePlayer from "@/composables/player";

const player = usePlayer();
const duration = ref(0);
const first = ref(false);

const {
  togglePlay,
  isPlaying,
  currentSong,
  progress,
  currentPlaylist,
  volume,
} = player;

function toggleQueuePlaylist() {
  player.isShowQueuePlaylist.value = <any>!player.isShowQueuePlaylist.value;
}

function handleChangeDuration(percent: number) {
  player.Player.seek(percent);
}

onMounted(() => {
  watch(player.progress, (val: number) => {
    if (player.Player) {
      duration.value = player.Player.calculateDuration(val);
    }
  });
  watch(player.isPlaying, (val) => {
    if (val) {
      first.value = true;
    }
  });
});

function handleMute() {
  player.isMuted.value = !player.isMuted.value;
}

function handleChangeVolume(percent: number) {
  player.volume.value = percent;
}
</script>
