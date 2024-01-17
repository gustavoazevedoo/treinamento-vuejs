import { ref } from "vue";

const state = ref({
  currentUser: {},
});

export default state;

export function cleanCurrentUser() {
  state.value.currentUser = {};
}

export function setCurrentUser(user) {
  state.value.currentUser = user;
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.value.currentUser, apiKey };
  state.value.currentUser = currentUser;
}
