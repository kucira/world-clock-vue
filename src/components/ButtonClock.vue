<script setup lang="ts">
const props = defineProps(["label", "actionCaptured"]);

const defaultStyleContainer = "flex space-x-2 justify-center";
const defaultStyle =
  "inline-block px-6 py-2.5 bg-orange-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-800 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out";
</script>

<template>
  <div :class="[$attrs.styleContainer, defaultStyleContainer]">
    <button
      type="button"
      @click="$emit(props.actionCaptured)"
      :class="[$attrs.style, defaultStyle]"
    >
      {{ label }}
    </button>
  </div>
</template>
