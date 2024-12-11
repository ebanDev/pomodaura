export const useMainStore = defineStore('main', () => {
  const auraGradient = ref('linear-gradient(90deg, rgb(255, 0, 195) 33%, rgb(148, 0, 255) 100%)')
  const auraShape = ref('circle')
  const workMinutes = ref(25)
  const breakMinutes = ref(5)
  const addNoise = ref(true)
  const pomodoroPosition = ref({ x: 0, y: 0 })
  const kittyPosition = ref({ x: 0, y: 0 })
  const kittyOpen = ref(false)

  function applySettings(newWorkMinutes: number, newBreakMinutes: number) {
    workMinutes.value = newWorkMinutes
    breakMinutes.value = newBreakMinutes
  }

  return {
    auraGradient,
    auraShape,
    workMinutes,
    breakMinutes,
    addNoise,
    pomodoroPosition,
    kittyPosition,
    kittyOpen,
    applySettings
  }
}, {
  persist: true,
},
)
