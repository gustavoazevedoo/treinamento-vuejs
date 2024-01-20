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

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800">
          Listagem
        </h1>
        <Filters
          class="mt-8 animate__animated animate__fadeIn animate__faster"
          @select="(type) => changeFeedbacksType(type)"
        />
      </div>
      <div class="col-span-3 px-10 pt-20">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks :(.
        </p>

        <p
          v-if="!state.feedbacks.length && !state.isLoading && !state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido.
        </p>

        <FeedbackCardLoading v-if="state.isLoading" />
        <FeedbackCard
          v-for="(feedback, index) in state.feedbacks"
          v-else
          :key="feedback.id"
          :is-opended="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <FeedbackCardLoading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  onErrorCaptured, onMounted, onUnmounted, ref,
} from "vue";
import FeedbackCardLoading from "../../components/FeedbackCard/FeedbackCardLoading.vue";
import FeedbackCard from "../../components/FeedbackCard/index.vue";
import HeaderLogged from "../../components/HeaderLogged/index.vue";
import services from "../../services";
import Filters from "./Filters.vue";

const state = ref({
  isLoading: false,
  isLoadingMoreFeedbacks: false,
  feedbacks: [],
  currentFeedbackType: "",
  pagination: {
    offset: 0,
    limit: 5,
  },
  hasError: false,
});

function handleErrors(error) {
  state.value.isLoading = false;
  state.value.hasError = !!error;
}

async function fetchFeedbacks() {
  try {
    state.value.isLoading = true;
    const { data } = await services.feedbacks.getAll({
      ...state.value.pagination,
      type: state.value.currentFeedbackType,
    });

    state.value.feedbacks = data.results;
    state.value.pagination = data.pagination;
    state.value.isLoading = false;
  } catch (error) {
    handleErrors(error);
  }
}

function changeFeedbacksType(type) {
  state.value.pagination.offset = 0;
  state.value.pagination.limit = 5;
  state.value.currentFeedbackType = type;
  fetchFeedbacks();
}

async function handleScroll() {
  const isBottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight)
  >= document.documentElement.scrollHeight;

  if (state.value.isLoading || state.value.isLoadingMoreFeedbacks) return;
  if (!isBottomOfWindow) return;
  if (state.value.feedbacks.length >= state.value.pagination.total) return;

  try {
    state.value.isLoadingMoreFeedbacks = true;
    const { data } = await services.feedbacks.getAll({
      ...state.value.pagination,
      type: state.value.currentFeedbackType,
      offset: state.value.pagination.offset + state.value.pagination.limit,
    });

    if (data.results.length) {
      state.value.feedbacks.push(...data.results);
    }

    state.value.isLoadingMoreFeedbacks = false;
    state.value.pagination = data.pagination;
  } catch (error) {
    state.value.isLoadingMoreFeedbacks = false;
    handleErrors(error);
  }
}

onMounted(() => {
  fetchFeedbacks();
  window.addEventListener("scroll", handleScroll, false);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, false);
});

onErrorCaptured(handleErrors);
</script>
