import type { User } from '@/interfaces/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBannerStore } from './BannerStore'
import Axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const API_URL = 'https://test.resabooking.fr/api/users'
  const bannerStore = useBannerStore()

  async function getAllUser() {
    try {
      const response = await Axios({
        url: API_URL,
        method: 'GET',
      })
      users.value = response.data.users
    } catch (error) {
      console.error('Error get users:', error)
      bannerStore.showBanner('Error loading users', 'error')
    }
  }

  async function createUser(userData: Omit<User, 'id'> & { password: string }) {
    try {
      const response = await Axios({
        url: API_URL,
        method: 'POST',
        data: userData,
      })
      users.value.push(response.data)
      bannerStore.showBanner('User created successfully', 'success')
      return true
    } catch (error: any) {
      console.error('Error creating user:', error)
      const errorMessage =
        error.response?.data?.message || 'Error creating user'
      bannerStore.showBanner(errorMessage, 'error')
      return false
    }
  }

  async function updateUser(
    userId: string,
    userData: Partial<Omit<User, 'id'>> & { password?: string }
  ) {
    try {
      const response = await Axios({
        url: `${API_URL}/${userId}`,
        method: 'PATCH',
        data: userData,
      })
      const index = users.value.findIndex((u) => u.id === userId)
      if (index !== -1) {
        users.value[index] = response.data
      }
      bannerStore.showBanner('User updated successfully', 'success')
      return true
    } catch (error: any) {
      console.error('Error updating user:', error)
      const errorMessage =
        error.response?.data?.message || 'Error updating user'
      bannerStore.showBanner(errorMessage, 'error')
      return false
    }
  }

  async function deleteUser(userId: string) {
    try {
      await Axios({
        url: `${API_URL}/${userId}`,
        method: 'DELETE',
      })
      users.value = users.value.filter((u) => u.id !== userId)
      bannerStore.showBanner('User deleted successfully', 'success')
      return true
    } catch (error: any) {
      console.error('Error deleting user:', error)
      const errorMessage =
        error.response?.data?.message || 'Error deleting user'
      bannerStore.showBanner(errorMessage, 'error')
      return false
    }
  }

  return { users, bannerStore, getAllUser, createUser, updateUser, deleteUser }
})
