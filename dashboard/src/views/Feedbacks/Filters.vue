<template>
  <div
    v-if="state.filters.length > 1"
    class="flex flex-col"
  >
    <h1 class="text-2xl font-medium text-gray-800">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        class="flex items-center justify-between py-1 px-4 rounded cursor-pointer"
        :class="filter.active && 'bg-gray-200'"
        @click="handleSelect(filter)"
      >
        <div class="flex items-center">
          <span
            :class="filter.color.background"
            class="w-2 h-2 rounded-full inline-block mr-2"
          />
          <span>{{ filter.label }}</span>
        </div>
        <span
          class="font-bold text-brand-graydark"
          :class="filter.active && filter.color.text"
        >{{ filter.amount }}</span>
      </li>
    </ul>
  </div>

  <div v-else>
    <FiltersLoading />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useStore from "../../hooks/useStore";
import services from "../../services";
import FiltersLoading from "./FiltersLoading.vue";

const store = useStore("Global");

const emit = defineEmits(["select"]);

const LABELS = {
  all: "Todos",
  issue: "Problemas",
  idea: "Ideias",
  other: "Outros",
};

const COLORS = {
  all: {
    background: "bg-brand-info",
    text: "text-brand-info",
  },
  issue: {
    background: "bg-brand-danger",
    text: "text-brand-danger",
  },
  idea: {
    background: "bg-brand-warning",
    text: "text-brand-warning",
  },
  other: {
    background: "bg-brand-graydark",
    text: "text-brand-graydark",
  },
};

const state = ref({
  hasError: false,
  filters: [
    {
      label: null, amount: null, color: null, active: null, type: null,
    },
  ],
});

function applyFiltersStructure(summary) {
  return Object.keys(summary).map((key) => {
    const currentFilter = {
      label: LABELS[key],
      amount: summary[key],
      color: COLORS[key],
    };

    if (key === "all") {
      currentFilter.active = true;
    } else {
      currentFilter.type = key;
    }

    return currentFilter;
  });
}

onBeforeMount(async () => {
  try {
    const { data } = await services.feedbacks.getSummary();
    state.value.filters = applyFiltersStructure(data);
  } catch (error) {
    state.value.hasError = !!error;
    state.value.filters = applyFiltersStructure({
      all: 0, issues: 0, idea: 0, other: 0,
    });
  }
});

function handleSelect({ type }) {
  if (store.isLoading) return;

  state.value.filters = state.value.filters.map((filter) => {
    if (filter.type === type) {
      return { ...filter, active: true };
    }
    return { ...filter, active: false };
  });

  emit("select", type);
}

</script>
