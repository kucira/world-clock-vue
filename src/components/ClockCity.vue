<script setup lang="ts">
import ButtonClock from "./ButtonClock.vue";

defineProps(["city", "label", "time", "abbreviation"]);
const emit = "handleRemove";
</script>

<template>
  <div
    className="hover:cursor-pointer hover:drop-shadow-2xl  my-4 min-h-[25vh] min-w-[25vh] max-h-[25vh] drop-shadow-lg"
  >
    <div
      className="bg-white rounded-md h-full w-full flex flex-col justify-center items-center"
    >
      <div className="h-full text-2xl text-center">
        <p className="capitalize">
          {{ city }}
        </p>
        <p className="text-lg">{{ label }}</p>
      </div>

      <div className="h-full text-5xl">{{ time }}</div>

      <div className="h-full">
        <p className="uppercase text-center">{{ abbreviation }}</p>
        <p>00:00</p>
      </div>

      <ButtonClock
        styleContainer="pb-12"
        label="Remove"
        :actionCaptured="emit"
        @handleRemove="$emit(emit)"
      />
    </div>
  </div>
</template>
