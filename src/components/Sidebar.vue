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
        <button type="button" @click="open = true">
          <span class="mx-1 hover:text-blue-400">Đăng nhập</span>
        </button>
        |
        <button type="button" @click="open = true">
          <span class="mx-1 hover:text-blue-400">Đăng ký</span>
        </button>
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
    <Modal :open="open" @close="open = false">
      <div class="mx-4">
        <div class="pb-8 pt-4">
          <h2 class="text-xl font-bold">Đăng nhập</h2>
        </div>
        <div
          class="px-2 py-2 flex items-center border border-gray-300 rounded-md my-4 mx-4 bg-gray-100"
        >
          <UserIcon class="w-5 h-5 text-gray-400 mr-2" />
          <input
            class="bg-gray-100 outline-none w-full border-l-2 h-full border-gray-300 px-2"
            type="text"
            name="username"
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>
        <div
          class="px-2 py-2 flex items-center border border-gray-300 rounded-md my-4 mx-4 bg-gray-100"
        >
          <LockClosedIcon class="w-5 h-5 text-gray-400 mr-2" />
          <input
            class="bg-gray-100 outline-none w-full border-l-2 h-full border-gray-300 px-2"
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <div class="mx-4 my-4 flex flex-row-reverse items-center justify-end">
          <label for="remember">Ghi nhớ</label>
          <input
            class="mx-2"
            checked
            type="checkbox"
            name="remember"
            id="remember"
          />
        </div>
        <div class="my-2 mx-4">
          <button
            class="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white font-bold mt-4"
            type="submit"
          >
            Đăng nhập
          </button>
        </div>

        <div class="my-4 flex items-center justify-center">
          <span class="mx-2">Hoặc đăng nhập bằng</span>
          <button
            type="button"
            class="p-4 bg-gray-200 rounded-full mx-2 hover:bg-gray-100"
          >
            <img
              class="w-5 h-5"
              src="https://cdn.iconscout.com/icon/free/png-24/facebook-logo-2019-1597680-1350125.png"
              alt="facebook-auth"
            />
          </button>
          <button
            type="button"
            class="p-4 bg-gray-200 rounded-full mx-2 hover:bg-gray-100"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAixJREFUOE+tlL9vUlEUx7/nvopgotCYaBhMSYzON/6YtHhZ3BppdKkORRMXl9bNxQhN/4CuTi1DdWplcEKTXqKDi/DqqonoYLWLPEIoNOUdcx/y+qBgGLzjyff7Oefce84lDDk7SipAzAOUAEF5EuYqAA24+bi29aCNgoEdJROAteqbh2XxoNAWOo/PaNvuSXzQrpLyAGKLiGKj/P1xLsW3yt1qAXig30rG9iC+DkIYvA0m0xKIWAI01S2ItyPsqklt1/pAP9TlAhFuBTI6gpE5qz8WBlpXIJENs5sOQrxE+0XI1qfTlebbc+C2ZWKOxR0V7H+cVg1ohQkLnZ8RNDbOo1ML3Y/r8to45qCGWkVoItzwem9Z9fBMJzoISeacLAR4FNyFKFH7zaGAGaXwzb9zE3All5yRkO6MIff/QMHWmq71JdWcuWrPFvxnNQnHq6iINRDmPx9E8chJosHHcuW5zey/Lnt6qZ4h8GpPw0Sz3vO/bk9VlhtXuu0y15jdlH2v4I9/EKqyHHPJqYAo0YsL99SkN9mXXtxeAWHBz2BgoEX77kY+CJEv76gT3588n2hfuHioRf7ds2jGA8lX6ZhoWWYV+p6eYTaeqsSoMZAggjT60K8HCNWvm/qdffe4/JCNVP2lletpKYRlvocjczTsvibq1xDafZh6//Sk96X0fSOmMtoTBSLyBnTUYeZvzG46eI99oJ7RVEfCWgRzogc1ZhBpBmt7bvPICv0BIUjuZjOL37cAAAAASUVORK5CYII="
              alt="google-auth"
            />
          </button>
        </div>
        <div>
          <span class="text-gray-500 text-sm">Chưa có tài khoản NCT ID? </span
          ><a class="text-cyan-600 text-sm" href="#">Đăng ký ngay</a>
        </div>
      </div>
    </Modal>
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
import {
  Cog6ToothIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
import Modal from "./Modal.vue";
const open = ref(false);
</script>
