<template>
  <div
    class="flex flex-col items-start mt-8 px-4 rounded h-[200px] w-full bg-gray-100"
  >
    <ContentLoader
      class="mt-3 rounded"
      width="40%"
      height="30px"
      animation-duration="2s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="100%"
      height="30px"
      animation-duration="2s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="100%"
      height="30px"
      animation-duration="2.3s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="100%"
      height="30px"
      animation-duration="2.7s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="100%"
      height="30px"
      animation-duration="2.9s"
    />
  </div>
</template>

<script setup>
import ContentLoader from "../../components/ContentLoader/index.vue";
</script>
