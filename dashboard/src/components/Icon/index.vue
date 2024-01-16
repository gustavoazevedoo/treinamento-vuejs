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

const icons = {
  Loading: markRaw(Loading),
};

defineProps({
  name: {
    type: String, required: true,
  },
});

</script>
