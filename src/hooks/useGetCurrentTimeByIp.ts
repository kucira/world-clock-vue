import { TIMEZONE_IP_ENDPOINT } from "@/constants/constant";
import { ref, type Ref } from "vue";

type Timezone = {
  timezone: Ref;
};

export default function useGetCurrentTimeByIp(): Timezone {
  const timezone = ref<string>("");

  fetch(`${TIMEZONE_IP_ENDPOINT}`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const json = await res.json();
      timezone.value = json;
    })
    .catch((err) => console.error(err));

  return {
    timezone,
  };
}
