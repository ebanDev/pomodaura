export function useAudio(src: string) {
  let audio: HTMLAudioElement | null = null

  async function playAudio() {
    if (!audio) {
      audio = new Audio(src)
      audio.muted = true
      await audio.play()
      audio.muted = false
    }
    audio.currentTime = 0
    try {
      await audio.play()
    } catch (error) {
      console.error('Audio playback failed:', error)
    }
  }

  return { playAudio }
}
