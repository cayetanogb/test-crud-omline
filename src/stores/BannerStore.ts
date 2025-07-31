import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBannerStore = defineStore('banner', () => {
  /*
   * Crea los atributos y los métodos que consideres necesarios
   * para mostrar y ocultar el componente `BannerComponent`,
   * cambiar su color y modificar su texto.
   *
   * De ser posible, añade comentarios JSDoc.
   */
  const message = ref('')
  const type = ref<'success' | 'error' | 'info'>('info')
  const isVisible = ref(false)
  const timeoutId = ref<number | null>(null)

  function showBanner(
    msg: string,
    bannerType: 'success' | 'error' | 'info',
    duration = 3000
  ) {
    message.value = msg
    type.value = bannerType
    isVisible.value = true

    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    timeoutId.value = setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  function hideBanner() {
    isVisible.value = false
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  }

  return {
    message,
    type,
    isVisible,
    showBanner,
    hideBanner,
  }
})
