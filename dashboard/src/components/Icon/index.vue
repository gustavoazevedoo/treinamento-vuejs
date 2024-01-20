<template>
  <component
    :is="icons[name]"
    v-if="icons[name]"
    v-bind="$props"
  />
</template>

<script setup>
import { markRaw } from "vue";
import Loading from "./Loading.vue";
import Copy from "./Copy.vue";
import ChevronDown from "./ChevronDown.vue";

const icons = {
  Loading: markRaw(Loading),
  Copy: markRaw(Copy),
  ChevronDown: markRaw(ChevronDown),
};

defineProps({
  name: {
    type: String, required: true,
  },
});

</script>
