<script setup>
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import ModalFactory from "./components/Modal/ModalFactory/index.vue";
import services from "./services";
import { setCurrentUser } from "./store/user";

const route = useRoute();
const router = useRouter();

watch(() => route.path, async () => {
  if (route.meta.hasAuth) {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push({ name: "Home" });
      return;
    }

    const { data } = await services.users.getMe();
    setCurrentUser(data);
  }
});

</script>

<template>
  <RouterView />
  <ModalFactory />
</template>
