<template>
  <div>
    <div class="flex gap-8 items-center justify-center">
      <v-select
        label="Select location"
        :items="locationList"
        v-model="selectedLocation"
        max-width="368"
      ></v-select
      ><v-btn @click="setFilter">apply pie chart </v-btn>
    </div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>
<script lang="ts" setup>
import Chart from "chart.js/auto";
import emotionService from "@/services/emotionService";
import { type IEmotionFilter } from "@/services/emotionService";
const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
const selectedLocation = ref("all");

const locationList = ref<string[]>([
  "Istanbul",
  "Ankara",
  "Izmir",
  "Bursa",
  "Adana",
  "all",
]);
const data = {
  labels: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "all"],
  datasets: [
    {
      label: "Dataset 1",
      data: ["1", "2", "3", "4", "5"],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
    },
  ],
};
const config = {
  type: "pie",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Pie Chart",
      },
    },
  },
};
const ctx = useTemplateRef("pieChart");
const chartInstance = ref(null);
onMounted(() => {
  chartInstance.value = new Chart(ctx.value, config);
});
const emotionsFilters = ref<IEmotionFilter>({
  start_date: "2024/01",
  end_date: "2024/06",
  gender: "all",
  location: "Izmir",
  age: "all",
});
async function fetchData() {
  // debugger;
  try {
    const response = await emotionService.getEmotionsData(
      emotionsFilters.value
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  fetchData();
});
</script>
