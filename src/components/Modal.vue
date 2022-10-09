<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
defineProps<{ open: boolean }>();
defineEmits(["close"]);
</script>

<template>
  <teleport to="body">
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transition scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transition scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        ></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <div
              class="relative bg-white rounded-lg shadow p-4 w-full max-w-md h-full md:h-auto"
            >
              <button
                type="button"
                @click="$emit('close')"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <XMarkIcon class="w-8 h-8" />
              </button>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>
