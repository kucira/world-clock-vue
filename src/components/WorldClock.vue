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

const { timezone } = useGetCurrentTimeByIp();

const showModal = ref(false);
const cityLabel = ref("");
const selectedCity = ref("");
const interval = ref(0);

const localTime = ref(new Date(getCurrentTime(timezone?.value?.datetime)));
const city = computed(() => timezone?.value?.timezone?.split("/")[1]);
const aheadBehind = computed(() => getAheadBehind(timezone?.value?.datetime));
const diffHour = computed(() =>
  getDiffTime(new Date(), new Date(getCurrentTime(timezone?.value?.datetime)))
);

onMounted(() => {
  interval.value = setInterval(() => {
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
  clearInterval(interval.value);
});

const handleRemove = (city: string) => {
  console.log("remove city: " + city);
};

const addCity = () => {
  console.log("add");
  showModal.value = !showModal.value;
};

const onOk = () => {
  console.log("onOk");
  showModal.value = !showModal.value;
  console.log(selectedCity.value, cityLabel.value);
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
          @handleRemove="handleRemove"
          :cities="['jakarta', 'Manado']"
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
        v-model="cityLabel"
        name="label"
        type="text"
        placeholder="Input Short Label"
        maxlength="20"
      />
    </div>
  </ModalClock>
</template>
