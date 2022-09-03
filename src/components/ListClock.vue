<script setup lang="ts">
import ClockCity from "./ClockCity.vue";

defineProps(["cities", "currentTime"]);
defineEmits(["handleRemove"]);
</script>

<template>
  <div className="h-full flex flex-row justify-evenly">
    <div v-for="city in cities" :key="city.name">
      <ClockCity
        :city="city.name"
        :currentCity="currentTime.timezone"
        :currentTime="currentTime"
        :label="city.label"
        @handleRemove="$emit('handleRemove', city.name)"
      />
    </div>
  </div>
</template>
