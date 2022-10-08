<template>
  <aside class="flex-none w-52 border-r-2 border-gray-200">
    <div class="flex justify-between items-center">
      <div class="px-3 py-2">
        <img class="h-6 w-auto" src="@/assets/logo.png" alt="NCT" />
      </div>
      <div class="px-3 py-2">
        <button
          type="button"
          class="border-gray-300 p-2 py-1 uppercase text-gray-400 text-xs font-semibold border rounded-full hover:text-blue-400 hover:border-blue-400"
        >
          Nâng cấp
        </button>
      </div>
    </div>
    <div
      class="text-xs font-bold text-gray-600 px-4 py-6 flex item-center justify-between"
    >
      <div class="flex-none">
        <span class="mx-1 hover:text-blue-400">Đăng nhập</span> |
        <span class="mx-1 hover:text-blue-400">Đăng ký</span>
      </div>
      <button type="button">
        <Cog6ToothIcon class="w-4 h-4 text-gray-500 hover:text-blue-400" />
      </button>
    </div>
    <div class="px-2">
      <ul>
        <li class="text-xs text-gray-600 font-normal px-4 py-2 capitalize">
          <router-link to="" class="flex"
            ><MagnifyingGlassIcon class="w-4 h-4 text-green-500 mr-2" />Tìm
            kiếm</router-link
          >
        </li>
        <li class="text-xs text-gray-600 font-normal px-4 py-2 capitalize">
          <router-link to="" class="flex"
            ><HomeIcon class="w-4 h-4 text-blue-500 mr-2" /> Trang
            chủ</router-link
          >
        </li>
        <li class="text-xs text-gray-600 font-normal px-4 py-2 capitalize">
          <router-link to="" class="flex"
            ><RectangleStackIcon class="w-4 h-4 text-yellow-500 mr-2" />Khám
            phá</router-link
          >
        </li>
        <li class="text-xs text-gray-600 font-normal px-4 py-2 capitalize">
          <router-link to="" class="flex"
            ><MusicalNoteIcon class="w-4 h-4 text-purple-500 mr-2" />Nghe gì hôm
            nay</router-link
          >
        </li>
        <li class="text-xs text-gray-600 font-normal px-4 py-2 capitalize">
          <router-link to="" class="flex"
            ><ChartBarIcon class="w-4 h-4 text-red-500 mr-2" />BXH
            NCT</router-link
          >
        </li>
        <li class="text-xs text-gray-600 font-normal px-4 py-2 capitalize">
          <router-link to="" class="flex"
            ><CloudIcon class="w-4 h-4 text-cyan-500 mr-2" />Music
            4U</router-link
          >
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  HomeIcon,
  RectangleStackIcon,
  MusicalNoteIcon,
  ChartBarIcon,
  CloudIcon,
} from "@heroicons/vue/24/solid";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
</script>
