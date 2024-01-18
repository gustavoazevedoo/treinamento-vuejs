<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import HeaderLogged from "../../components/HeaderLogged/index.vue";
import useStore from "../../hooks/useStore";

const store = useStore();
const state = ref({
  isLoading: false,
  hasError: false,
});

function handleError(error) {
  state.value.isLoading = false;
  store.hasError = !!error;
}

watch(() => store.User.currentUser, () => {
  if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
    handleError(true);
  }
});

</script>
