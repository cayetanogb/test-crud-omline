import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'

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

  const title = ref('')
  const user = ref<User>()

  function open(textTitle: string, userEdit?: User) {
    title.value = textTitle
    show.value = true
    user.value = userEdit ?? undefined
  }

  function close() {
    title.value = ''
    show.value = false
    user.value = undefined
  }

  return {
    show,
    title,
    user,
    open,
    close,
  }
})
