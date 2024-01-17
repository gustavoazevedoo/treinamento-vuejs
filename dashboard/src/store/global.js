import { ref } from "vue";

const state = ref({
  isLoading: false,
});

export default state;

export function setGlobalLoading(status) {
  state.value.isLoading = status;
}
