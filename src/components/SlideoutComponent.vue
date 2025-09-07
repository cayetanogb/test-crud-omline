<template>
  <Transition name="fade">
    <div
      v-if="slideoutStore.show"
      class="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-70"
    ></div>
  </Transition>

  <Transition name="slide">
    <div
      v-if="slideoutStore.show"
      class="h-screen fixed top-0 right-0 min-w-[400px] max-w-[800px] bg-white shadow-md z-80"
    >
      <!-- 
                Implementa las funcionalidades del archivo `/src/stores/SlideoutStore.ts`
                para mostrar y ocultar este componente, así como para modificar su contenido.
            -->
      <div
        class="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
        @click.self="closeSlideout"
      >
        <div
          class="fixed top-0 right-0 w-full md:w-1/3 bg-white h-full shadow-lg p-6"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">{{ title }}</h2>
            <button
              @click="closeSlideout"
              class="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <slot v-if="!slideoutStore.user?.id">
            <CreateUserForm />
          </slot>
          <slot v-else>
            <UpdateUserForm
              :id="slideoutStore.user.id"
              :name="slideoutStore.user.name"
              :email="slideoutStore.user.email"
            />
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CreateUserForm from '@/components/CreateUserForm.vue'
import UpdateUserForm from '@/components/UpdateUserForm.vue'
import { useSlideoutStore } from '../stores/SlideoutStore'

const slideoutStore = useSlideoutStore()
const title = slideoutStore.title
const closeSlideout = () => {
  slideoutStore.close()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 200ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
