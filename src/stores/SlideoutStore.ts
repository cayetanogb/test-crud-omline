import { markRaw, ref, type Component } from 'vue'
import { defineStore } from 'pinia'

export const useSlideoutStore = defineStore('slideout', () => {
  /**
   * @var { Ref<boolean> }
   */
  const show = ref<boolean>(false)

  /*
   * Crea los atributos y los métodos que consideres necesarios para mostrar y ocultar
   * el componente `SlideoutComponent` y modificar su contenido.
   *
   * De ser posible, añade comentarios JSDoc como los ejemplificados en el atributo `show`.
   */

  const contentComponent = ref<Component | null>(null)
  const title = ref('')

  function open(component: Component, textTitle: string) {
    contentComponent.value = markRaw(component)
    title.value = textTitle
    show.value = true
  }

  function close() {
    contentComponent.value = null
    title.value = ''
    show.value = false
  }

  return {
    show,
    contentComponent,
    title,
    open,
    close,
  }
})
