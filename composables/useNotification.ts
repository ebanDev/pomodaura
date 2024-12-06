import { onMounted } from 'vue'

export function useNotification() {
  let permissionGranted = false

  onMounted(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        permissionGranted = (permission === 'granted')
      })
    }
  })

  function notify(title: string, options?: NotificationOptions) {
    if ('Notification' in window && permissionGranted) {
      new Notification(title, options)
    }
  }

  return { notify }
}
