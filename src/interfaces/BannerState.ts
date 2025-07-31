export interface BannerState {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  timeoutId: number | null
}
