<template>
  <Teleport
    to="body"
  >
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50
      flex items-center justify-center w-full h-full
      bg-black bg-opacity-50"
      @click="handleModalToggle({ status: false })"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <div
          class="flex flex-col overflow-hidden bg-white rounded-lg
            animate__animated animate__fadeInDown animate__faster"
        >
          <div class="flex flex-col px-12 py-10 bg-white">
            <component
              :is="state.component"
              v-bind="state.props"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  markRaw,
  onBeforeUnmount, onMounted, ref,
} from "vue";
import useModal from "../../../hooks/useModal";

const modal = useModal();
const DEFAULT_WIDTH = "w-3/4 lg:w-1/3";

const state = ref({
  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_WIDTH,
});

async function handleModalToggle(payload) {
  if (payload.status) {
    state.value.component = markRaw((await import(`../${payload.component}/index.vue`)).default);
    state.value.props = payload.props;
    state.value.width = payload.width ?? DEFAULT_WIDTH;
  } else {
    state.value.component = {};
    state.value.props = {};
    state.value.width = DEFAULT_WIDTH;
  }
  state.value.isActive = payload.status;
}

onMounted(() => {
  modal.listen(handleModalToggle);
});

onBeforeUnmount(() => {
  modal.off(handleModalToggle);
});

</script>
