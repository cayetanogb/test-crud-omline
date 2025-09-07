<template>
  <div class="p-6">
    <div class="flex justify-end mb-4">
      <button
        @click="openCreateUserForm"
        class="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Create New User
      </button>
    </div>

    <table id="user-table" class="display w-full text-left table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button
              @click="openEditUserForm(user)"
              class="py-2 px-4 mr-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              @click="userStore.deleteUser(user.id)"
              class="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <BannerComponent
      :message="bannerStore.message"
      :type="bannerStore.type"
      :is-visible="bannerStore.isVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BannerComponent from './BannerComponent.vue'

import { useUserStore } from '../stores/UserStore'
import { useSlideoutStore } from '../stores/SlideoutStore'
import { useBannerStore } from '../stores/BannerStore'
import type { User } from '../interfaces/User'

const slideoutStore = useSlideoutStore()
const userStore = useUserStore()
const bannerStore = useBannerStore()

const openCreateUserForm = () => {
  slideoutStore.open('Create User')
}

const openEditUserForm = (user: User) => {
  slideoutStore.open('Update User', user)
}

onMounted(async () => {
  await userStore.getAllUser()
})
</script>
