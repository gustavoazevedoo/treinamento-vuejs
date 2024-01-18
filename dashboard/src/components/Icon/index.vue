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

const icons = {
  Loading: markRaw(Loading),
  Copy: markRaw(Copy),
};

defineProps({
  name: {
    type: String, required: true,
  },
});

</script>
