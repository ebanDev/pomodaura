<template>
  <AuraBackground :auraGradient="auraGradient" :addNoise="addNoise" :shape="auraShape" />
  <div class="container">
    <div class="settings">
      <UButton class="w-56" icon="i-ph-timer-bold" @click="pomodoroSettingsOpen = true" v-if="!pomodoroSettingsOpen">
        Open Pomodoro Settings</UButton>
      <UButton class="w-56" icon="i-ph-palette-bold" @click="auraSettingsOpen = true" v-if="!auraSettingsOpen">Open Aura
        Settings</UButton>
      <UButton class="w-56" icon="i-ph-cat-bold" @click="kittyOpen = true" v-if="!kittyOpen">Open Kitty</UButton>
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

<style>
.ck-cp-menu {
  display: none;
}

.ck-cp-container {
  box-shadow: none;
  width: 100%;
  --padding: 0;
}
</style>
