<template>
  <UCard class="w-80 h-max">
    <template #header>
      <div class="flex justify-between items-center">
        <h1>
          Aura Settings
        </h1>
        <UButton icon="i-ph-arrows-in-bold" color="gray" variant="ghost" size="sm"
          @click="$emit('close')" />
      </div>
    </template>
    <div class="flex flex-col gap-4">
      <Vue3ColorPicker v-model="auraGradient" mode="gradient" :showColorList="false" :showEyeDrop="false"
        :showAlpha="false" :showInputMenu="false" :showInputSet="false" :showPickerMode="false" />
      <UFormField label="Aura Shape">
        <USelect v-model="auraShape" :items="auraShapes" class="w-full" :icon="auraShapes.find(s => s.value === auraShape)?.icon" />
      </UFormField>
      <UFormField label="Noise effect">
        <USwitch v-model="addNoise" />
      </UFormField>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';

const store = useMainStore();
const { auraGradient, addNoise, auraShape } = storeToRefs(store);

const auraShapes = ref([
  { label: 'Circle', value: 'circle', icon: 'i-ph-circle-bold' },
  { label: 'Heart', value: 'heart', icon: 'i-ph-heart-bold' },
  { label: 'Star', value: 'star', icon: 'i-ph-star-bold' },
]);
</script>

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
