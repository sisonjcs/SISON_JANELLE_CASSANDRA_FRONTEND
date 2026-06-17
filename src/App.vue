<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
const route = useRoute()
const isTask = computed(() => {
    if (route.path != "/home" && route.path != "/stats" && route.path != "/about") {
      return true
    }
    return false
  })
</script>

<template>
  <header v-show="!isTask">
    <Navbar />
  </header>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
header {
  margin-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>