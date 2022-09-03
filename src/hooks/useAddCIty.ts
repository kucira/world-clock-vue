import { ref, type Ref } from "vue";

export default function useAddCity() {
  const cities = ref<any[]>([]);
  const showModal = ref(false);

  const handleAddCity = (selectedCity: Ref, shortLabel : Ref) => {
    if (selectedCity.value === "") {
      alert("Please select a city");
      return;
    }

    const cityAlreadyAdded = cities.value.find(
      (city: any) => city.name === selectedCity.value
    );

    if (!cityAlreadyAdded) {
      if (cities.value.length > 3) {  
        alert("Max number of Clocks");
        return;
      }
      cities.value.push({
        name: selectedCity.value,
        label: shortLabel.value,
      });

      shortLabel.value = "";
      selectedCity.value = "";
      return;
    }

    alert(`${selectedCity.value} Already in the list`);
  };

  const handleRemove = (selectedCity: string) => {
    const filteredCity = cities.value.filter(
        (city: any) => selectedCity !== city.name
      );
      cities.value = filteredCity;
  };

  return {
    cities,
    handleAddCity,
    showModal,
    handleRemove,
  };
}
