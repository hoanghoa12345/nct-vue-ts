<template>
  <div
    class="left-1/2 -translate-x-1/2 w-3 h-24 relative cursor-pointer"
    @mousedown="handler"
    @click="handler"
  >
    <div class="absolute w-0.5 left-1 h-full bg-gray-200 rounded-full"></div>
    <div
      :style="{ height: percent + '%' }"
      class="absolute bottom-0 w-0.5 left-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
    ></div>
    <div
      :style="{ bottom: percent + '%' }"
      class="absolute bottom-0 w-2.5 h-2.5 bg-white rounded-full border border-cyan-500"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
let temp = 0;
const props = defineProps({
  percent: { type: Number, required: true },
});

const emit = defineEmits(["change"]);
const isBusy = ref(false);

const percent = computed({
  get() {
    return props.percent;
  },
  set(val) {
    temp = val;
    emit("change", val);
  },
});

function handler(ev) {
  if (ev.type === "click" && ev.target) {
    percent.value = (ev.offsetX / ev.target.offsetWidth) * 100;
    emit("change", temp);
    return;
  }

  if (ev.type === "mousedown") {
    isBusy.value = true;
  }

  function handleMouseup() {
    if (isBusy.value) {
      emit("change", temp);
    }
    isBusy.value = false;
  }

  function handleMousemove(ev) {
    if (isBusy.value) {
      const e = ele.value;
      if (e) {
        const w = e.offsetWidth;
        let x = ev.clientX - e.offsetLeft;
        if (x < 0) x = 0;
        if (x > w) x = w;
        if (ev.target) {
          percent.value = (x / w) * 100;
          emit("progress", temp);
        }
      }
    }
  }

  onMounted(() => {
    document.addEventListener("mouseup", handleMouseup);
    document.addEventListener("mousemove", handleMousemove);
  });

  onUnmounted(() => {
    document.removeEventListener("mouseup", handleMouseup);
    document.removeEventListener("mousemove", handleMousemove);
  });
}
</script>
