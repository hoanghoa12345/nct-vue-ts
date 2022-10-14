<template>
  <div class="w-full relative h-3" @mousedown="handler" @click="handler">
    <div
      class="absolute top-1/2 w-full h-0.5 bg-gray-200 rounded-2xl align-baseline"
    ></div>
    <div
      class="absolute top-1/2 h-0.5 bg-gradient-to-l from-cyan-500 to-blue-500 rounded-2xl align-baseline"
      :style="{ width: percent + '%' }"
    ></div>
    <div
      class="w-4 h-4 absolute border-cyan-500 hover:bg-gray-200 bg-white border rounded-full"
      :style="{ left: percent + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

let temp = 0;

const props = defineProps({
  percent: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["change"]);

const percent = computed({
  get() {
    return props.percent;
  },
  set(val) {
    temp = val;
    emit("change", val);
  },
});

function handler(ev: any) {
  if (ev.type === "click" && ev.target) {
    percent.value = (ev.offsetX / ev.target.offsetWidth) * 100;
    emit("change", temp);
    return;
  }
}
</script>
