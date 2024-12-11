import { onMounted } from 'vue'

export function useNotification() {
  function notify(title: string, options?: NotificationOptions) {
    if ('Notification' in window) {
      new Notification(title, options)
    }
  }

  return { notify }
}
