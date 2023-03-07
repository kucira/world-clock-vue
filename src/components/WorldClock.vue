<script setup lang="ts">
import ContainerClock from "./ContainerClock.vue";
import MainClock from "./MainClock.vue";
import CardClock from "./CardClock.vue";
import ButtonClock from "./ButtonClock.vue";
import ListClock from "./ListClock.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import ModalClock from "./ModalClock.vue";
import useGetCurrentTimeByIp from "@/hooks/useGetCurrentTimeByIp";
import { getAheadBehind, getCurrentTime, getDiffTime } from "@/utils/util";
import useAddCity from "@/hooks/useAddCIty";

const { showModal, handleAddCity, cities, handleRemove } = useAddCity();
const { timezone: currentTimezone } = useGetCurrentTimeByIp();

const shortLabel = ref("");
const selectedCity = ref("");
let interval: ReturnType<typeof setInterval> | undefined;

const localTime = ref(
  new Date(getCurrentTime(currentTimezone?.value?.datetime))
);
const city = computed(() => currentTimezone?.value?.timezone?.split("/")[1]);
const aheadBehind = computed(() =>
  getAheadBehind(currentTimezone?.value?.datetime)
);
const diffHour = computed(() =>
  getDiffTime(
    new Date(),
    new Date(getCurrentTime(currentTimezone?.value?.datetime))
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

const addCity = () => {
  console.log("add");
  showModal.value = !showModal.value;
};

const onOk = () => {
  console.log("onOk");
  showModal.value = !showModal.value;
  console.log(selectedCity.value, shortLabel.value);
  handleAddCity(selectedCity, shortLabel);
};

const onCancel = () => {
  console.log("onCancel");
  showModal.value = !showModal.value;
};
</script>

<template>
  <ContainerClock>
    <CardClock>
      <div className="w-full h-full flex flex-col">
        <MainClock :city="city" :time="localTime" />
        <ListClock
          :currentTime="currentTimezone"
          @handleRemove="handleRemove"
          :cities="cities"
        />
        <ButtonClock
          styleContainer="pb-12"
          label="Add City"
          actionCaptured="addCity"
          @addCity="addCity"
        />
      </div>
    </CardClock>
  </ContainerClock>

  <ModalClock
    v-if="showModal"
    title="Add City"
    subtitle="Please Select City to Add"
    :onOk="onOk"
    :onCancel="onCancel"
  >
    <select v-model="selectedCity">
      <option value="">Select</option>
      <option value="Asia/Singapore">Singapore (Asia/Singapore)</option>
      <option value="Asia/Tokyo">Tokyo (Asia/Tokyo)</option>
      <option value="Asia/Seoul">Seoul (Asia/Seoul)</option>
      <option value="Australia/Melbourne">
        Melbourne (Australia/Melbourne)
      </option>
      <option value="Australia/Sydney">Sydney (Australia/Sydney)</option>
      <option value="Europe/London">London (Europe/London)</option>
      <option value="Europe/Paris">Paris (Europe/Paris)</option>
      <option value="Europe/Berlin">Berlin (Europe/Berlin)</option>
      <option value="America/New_York">New York (America/New_York)</option>
      <option value="America/Los_Angeles">
        Los Angeles (America/Los_Angeles)
      </option>
    </select>

    <div>
      <label htmlFor="label">Short Label</label>
      <br />
      <input
        v-model="shortLabel"
        name="label"
        type="text"
        placeholder="Input Short Label"
        maxlength="20"
      />
    </div>
  </ModalClock>
</template>
