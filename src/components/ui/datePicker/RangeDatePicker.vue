<template>
  <v-date-input
    v-model="model"
    label="Select prefered dates "
    max-width="368"
    multiple="range"
    min="2024-01-01"
    max="2025-12-30"
    hide-actions
  ></v-date-input>
</template>
<script setup>
import { useDate } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";

const adapter = useDate();
const model = defineModel({
  default: [new Date("2024-01-01"), new Date("2025-12-30")],
});
</script>
