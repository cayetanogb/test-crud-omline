<template>
  <!-- <div
    class="fixed top-4 left-1/2 -translate-x-1/2 rounded-lg text-white bg-green-500 shadow-md py-1 px-3 z-90"
  >
    <p>🐜</p>
  </div> -->
  <Transition name="fade">
    <div v-if="isVisible" :class="bannerClasses">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
/*
 * Modifica el archivo `/src/stores/BannerStore.ts`, crea los atributos y los métodos
 * que necesites e implementa dicho archivo en este componente, a fin de mostrarlo,
 * ocultarlo y modificarlo a voluntad.
 *
 * Se valorará el buen gusto en relación al UI/UX.
 */
import { computed } from 'vue'

const props = defineProps<{
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
}>()

const bannerClasses = computed(() => {
  let baseClasses = 'fixed top-4 right-4 p-4 rounded-md shadow-lg z-50'
  if (props.type === 'success') {
    baseClasses += ' bg-green-500 text-white'
  } else if (props.type === 'error') {
    baseClasses += ' bg-red-500 text-white'
  } else {
    baseClasses += ' bg-blue-500 text-white'
  }
  return baseClasses
})
</script>
