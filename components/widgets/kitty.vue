<template>
  <div v-draggable="{ position: kittyPosition, onDrag: onDrag }">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1>
            Random Kitty
          </h1>
          <UButton icon="i-ph-arrows-in-bold" color="gray" variant="ghost" size="sm" @click="$emit('close')" />
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <img ref="kittyImgEl" :src="kittySrc" alt="Random Kitty" class="rounded-lg w-64" draggable="false" />

        <UButton icon="i-ph-arrows-clockwise-bold" @click="refreshKitty">
          Refresh</UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { vDraggable } from '@neodrag/vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';

const store = useMainStore();
const { kittyPosition } = storeToRefs(store);
const kittyImgEl = ref<HTMLImageElement | null>(null);
const kittySrc = ref('https://cataas.com/cat/kitty');

function onDrag({ offsetX, offsetY }: { offsetX: number, offsetY: number }) {
  kittyPosition.value.x = offsetX;
  kittyPosition.value.y = offsetY;
}

function refreshKitty() {
  kittySrc.value = 'https://cataas.com/cat/cute?' + Math.random();
}
</script>
