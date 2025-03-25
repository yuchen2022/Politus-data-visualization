<template>
  <div>
    <div class="flex gap-8 items-center justify-center">
      <!-- <RangeDatePicker v-model="dateArray" /> -->
      <v-select
        label="Select emotion"
        :items="emotionsList"
        v-model="selectedEmotion"
        max-width="368"
      ></v-select
      ><v-btn @click="setFilter">apply bar chart </v-btn>
    </div>

    <canvas v-if="isRenderingChart" ref="barChart"></canvas>
  </div>
</template>
<script lang="ts" setup>
import Chart from "chart.js/auto";
import emotionService from "@/services/emotionService";
import { type IEmotionFilter } from "@/services/emotionService";
const isRenderingChart = ref(false);
const ctx = useTemplateRef("barChart");
const chartData = ref({
  labels: [],
  datasets: [],
});
const emotionsFilters = ref<IEmotionFilter>({
  start_date: "2024/01",
  end_date: "2024/06",
  gender: "all",
  location: "all",
  age: "all",
});
const selectedEmotion = ref("emotions_anger");

const emotionsList = ref<string[]>([]);
const chartInstance = ref(null);
async function fetchData() {
  try {
    const response = await emotionService.getEmotionsData(
      emotionsFilters.value
    );

    if (emotionsList.value.length == 0) {
      Object.keys(response.data.data[0].emotions).forEach((key) => {
        emotionsList.value.push(key);
      });
    }
    const payload = {
      label: "",
      data: [],
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
      borderWidth: 1,
    };
    chartData.value.labels = [];
    response.data.data.forEach((element) => {
      chartData.value.labels.push(element.date);
      payload.data.push(element.emotions[selectedEmotion.value]);
    });

    chartData.value.datasets = [payload];
  } catch (error) {
    console.log(error);
  } finally {
    chartInstance.value &&
      chartInstance.value.destroy &&
      chartInstance.value.destroy();
    chartInstance.value = null;
    isRenderingChart.valye = false;

    isRenderingChart.value = true;
    nextTick(() => {
      chartInstance.value = new Chart(ctx.value, {
        type: "bar",
        data: chartData.value,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
}

onMounted(() => {
  fetchData();
});
const dateArray = ref([]);

const startDate = computed(() => {
  if (dateArray.value.length) {
    return dateArray.value[0];
  }
  return null;
});
const endDate = computed(() => {
  if (dateArray.value.length) {
    return dateArray.value[dateArray.value.length - 1];
  }
  return null;
});
function setFilter() {
  fetchData();
}
</script>
