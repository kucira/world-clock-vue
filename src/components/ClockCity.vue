<script setup lang="ts">
import useGetTimezone from "@/hooks/useGetTimezone";
import {
  getTimeFormat,
  getCurrentTime,
  getAheadBehind,
  getDiffTime,
} from "@/utils/util";
import { computed, onMounted, onUnmounted, ref } from "vue";
import ButtonClock from "./ButtonClock.vue";

const props = defineProps(["city", "currentCity", "label", "currentTime"]);
defineEmits(["handleRemove"]);

const { timezone } = useGetTimezone({ city: props.city });
let interval: ReturnType<typeof setInterval> | undefined;

const cityTimezone = computed(() => timezone?.value?.timezone);
const abbreviations = computed(() => timezone?.value?.abbreviations);

const localTime = ref(new Date(getCurrentTime(timezone?.value?.datetime)));
const aheadBehind = computed(() => getAheadBehind(timezone?.value?.datetime));
const diffHour = computed(() =>
  getDiffTime(
    new Date(getCurrentTime(timezone?.value?.datetime)),
    new Date(props.currentTime?.datetime)
  )
);

onMounted(() => {
  interval = setInterval(() => {
    const time = new Date();
    const hour = time.getHours() === 0 ? 24 : time.getHours();
    time.setHours(
      aheadBehind.value.includes("ahead")
        ? time.getHours() + Math.abs(diffHour.value.diff)
        : hour - diffHour.value.diff
    );
    localTime.value = time;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

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
          {{ cityTimezone?.split("/")[1].replace("_", " ") }}
        </p>
        <p className="text-lg">{{ label }}</p>
      </div>

      <div className="h-full text-5xl">
        {{ getTimeFormat(localTime).label }}
      </div>

      <div className="h-full">
        <p className="uppercase text-center">{{ abbreviations }}</p>
        <p>
          {{
            diffHour.diff === 0
              ? ""
              : `${diffHour.label} ${currentCity?.split("/")[1]}`
          }}
        </p>
      </div>

      <ButtonClock
        styleContainer="pb-12"
        label="Remove"
        actionCaptured="handleRemove"
        @handleRemove="$emit('handleRemove')"
      />
    </div>
  </div>
</template>
