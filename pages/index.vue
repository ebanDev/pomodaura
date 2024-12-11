<template>
  <AuraBackground ref="auraRef" :auraGradient="auraGradient" :addNoise="addNoise" :shape="auraShape" />
  <div class="container">
    <div class="settings">
      <UButton class="w-56" icon="i-ph-timer-bold" @click="pomodoroSettingsOpen = true" v-if="!pomodoroSettingsOpen">
        Open Pomodoro Settings</UButton>
      <UButton class="w-56" icon="i-ph-palette-bold" @click="auraSettingsOpen = true" v-if="!auraSettingsOpen">Open Aura
        Settings</UButton>
      <UButton class="w-56" icon="i-ph-cat-bold" @click="kittyOpen = true" v-if="!kittyOpen">Open Kitty</UButton>
      <UButton v-if="showNotificationButton" class="w-56" icon="i-ph-bell-bold" @click="requestNotificationPermission">
        Enable Notifications
      </UButton>
      <UButton icon="i-ph-download-bold" class="w-56" @click="downloadAura">
        Download Aura
      </UButton>
    </div>

    <WidgetsPomodoroSettings v-if="pomodoroSettingsOpen" @close="pomodoroSettingsOpen = false" />
    <WidgetsAuraSettings v-if="auraSettingsOpen" @close="auraSettingsOpen = false" />
    <WidgetsKitty v-if="kittyOpen" @close="kittyOpen = false" />

    <WidgetsPomodoro :workDuration="workMinutes * 60" :breakDuration="breakMinutes * 60" />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()
const { addNoise, auraGradient, auraShape, workMinutes, breakMinutes, pomodoroPosition, kittyPosition, kittyOpen } = storeToRefs(store)
const pomodoroSettingsOpen = ref(false)
const auraSettingsOpen = ref(false)

const showNotificationButton = ref(false)

onMounted(() => {
  showNotificationButton.value = Notification.permission !== 'granted'
})

function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      showNotificationButton.value = false
      alert('Notifications enabled!')
    } else {
      alert('Notifications denied!')
    }
  })
}

const auraRef = ref()

function downloadAura() {
  const canvas = auraRef.value?.canvasRef
  if (!canvas) return

  // Create download link
  const link = document.createElement('a')
  link.download = 'pomodaura.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 20px;
}

.settings {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timer-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
