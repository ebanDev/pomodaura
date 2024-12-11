<template>
  <div v-draggable="{ position: pomodoroPosition, onDrag: onDrag }">
    <UCard class="w-64">
      <template #header>
        <h3>Pomodoro Timer</h3>
      </template>
      <h1 class="text-4xl font-bold text-center">{{ formattedTime }}</h1>
      <h2 class="text-xl font-bold text-center pb-4">{{ timerLabel }}</h2>

      <UButton v-if="!isRunning" @click="startTimer" icon="i-ph-play-bold" class="w-full">Start</UButton>
      <UButton v-if="isRunning" @click="stopTimer" icon="i-ph-pause-bold" class="w-full">Stop</UButton>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { vDraggable } from '@neodrag/vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';
import { useNotification } from '~/composables/useNotification'
import { useAudio } from '~/composables/useAudio'

interface Props {
  workDuration: number;
  breakDuration: number;
}

const props = defineProps<Props>()

const timeLeft = ref(props.workDuration)
const isWorking = ref(true)
const isRunning = ref(false)
let intervalId: number | null = null

const timerLabel = computed(() => isWorking.value ? 'Work' : 'Break')
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const { notify } = useNotification()
const { playAudio } = useAudio('/ding.mp3') // Place sound.mp3 in /public

const store = useMainStore();
const { pomodoroPosition } = storeToRefs(store);

function onDrag({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
  pomodoroPosition.value.x = offsetX;
  pomodoroPosition.value.y = offsetY;
}

function startTimer() {
  if (isRunning.value) return
  isRunning.value = true
  intervalId = setInterval(tick, 1000) as unknown as number
}

function stopTimer() {
  isRunning.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function tick() {
  timeLeft.value--
  if (timeLeft.value <= 0) {
    completeCycle()
  }
}

function completeCycle() {
  stopTimer()
  playAudio()
  notify(`${timerLabel.value} cycle complete!`, { body: 'Time to switch.' })
  isWorking.value = !isWorking.value
  timeLeft.value = isWorking.value ? props.workDuration : props.breakDuration
}

watch([timeLeft, isWorking], () => {
  document.title = `${timerLabel.value}: ${formattedTime.value}`;
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

onMounted(() => {
  // Reset timer each time (in case of hot reload or nav)
  timeLeft.value = props.workDuration
  document.title = `${timerLabel.value}: ${formattedTime.value}`;
})
</script>

<style scoped>
.pomodoro-timer {
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
