<template>
  <div v-draggable>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1>
            Pomodoro Settings
          </h1>
          <UButton icon="i-ph-arrows-in-bold" color="gray" variant="ghost" size="sm"
            @click="$emit('close')" />
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <UFormField label="Work Minutes">
          <UInput class="w-full" v-model="workMinutes" type="number" icon="i-ph-clock-bold" />
        </UFormField>
        <UFormField label="Break Minutes">
          <UInput class="w-full" v-model="breakMinutes" type="number" icon="i-ph-timer-bold" />
        </UFormField>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { vDraggable } from '@neodrag/vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';

const store = useMainStore();
const { workMinutes, breakMinutes } = storeToRefs(store);
</script>
