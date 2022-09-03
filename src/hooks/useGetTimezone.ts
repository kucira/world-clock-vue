import { ref, type Ref } from "vue";
import { TIMEZONE_ENDPOINT } from "@/constants/constant";

type Props = {
  city?: String;
};
type Timezone = {
  timezone: Ref;
}

export default function useGetTimezone({ city } : Props) : Timezone {
    const timezone = ref<any>("");

    fetch(`${TIMEZONE_ENDPOINT}/${city}`)
      .then(async (res: any) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();
        timezone.value = json;
      })
      .catch(err => console.error(err));

  return {
    timezone,
  };
}
