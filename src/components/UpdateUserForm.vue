<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-4 p-6 rounded-lg shadow-md border-black border"
  >
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        class="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
    <button
      type="submit"
      class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Update User
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/UserStore'
import type { User } from '../interfaces/User'

const userStore = useUserStore()

const props = defineProps<User>()

const form = ref({
  name: props.name,
  email: props.email,
})

const handleSubmit = async () => {
  const success = await userStore.updateUser(props.id, {
    name: form.value.name,
    email: form.value.email,
  })
  if (success) {
    form.value = {
      name: '',
      email: '',
    }
    userStore.getAllUser()
  }
}
</script>
