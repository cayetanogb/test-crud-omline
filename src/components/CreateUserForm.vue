<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-4 bg-white p-6 rounded-lg shadow-md"
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
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
        class="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
    <div>
      <label
        for="confirmPassword"
        class="block text-sm font-medium text-gray-700"
        >Confirm Password</label
      >
      <input
        type="password"
        id="confirmPassword"
        v-model="form.confirmPassword"
        required
        class="text-black mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
    <button
      type="submit"
      class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Create User
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/UserStore'

const userStore = useUserStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordMismatch = computed(() => {
  return (
    form.value.password !== form.value.confirmPassword &&
    form.value.confirmPassword !== ''
  )
})

const handleSubmit = async () => {
  if (passwordMismatch.value) {
    userStore.bannerStore.showBanner('Passwords do not match', 'error')
    return
  }
  const success = await userStore.createUser({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
  })
  if (success) {
    form.value = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
    userStore.getAllUser()
  }
}
</script>
