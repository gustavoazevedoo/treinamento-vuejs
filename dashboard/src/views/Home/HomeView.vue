<template>
  <div>
    <CustomHeader
      @create-account="handleAccountCreate"
      @login="handleLogin"
    />
    <Contact />
  </div>

  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">
      feedbacker © 2024
    </p>
  </footer>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Contact from "./Contact.vue";
import CustomHeader from "./CustomHeader.vue";
import useModal from "../../hooks/useModal";

const router = useRouter();
const modal = useModal();

function handleLogin() {
  modal.open({ component: "ModalLogin" });
}

function handleAccountCreate() {
  modal.open({ component: "ModalAccountCreate" });
}

onMounted(() => {
  const token = window.localStorage.getItem("token");
  if (token) {
    router.push({ name: "Feedbacks" });
  }
});

</script>
