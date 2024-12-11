<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup>
useHead({
  title: 'Pomodaura',
  meta: [
    { name: 'description', content: 'Pomodaura - A Pomodoro Timer Application' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
