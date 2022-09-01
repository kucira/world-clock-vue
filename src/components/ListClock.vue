<script setup lang="ts">
import ClockCity from "./ClockCity.vue";

defineProps(["cities"]);
</script>

<template>
  <div className="h-full flex flex-row justify-evenly">
    <div v-for="city in cities" :key="city">
      <ClockCity
        :city="city"
        label="label"
        @handleRemove="$emit('handleRemove', city)"
      />
    </div>
  </div>
</template>
