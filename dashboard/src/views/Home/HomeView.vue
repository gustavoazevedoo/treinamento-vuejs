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

const router = useRouter();

onMounted(() => {
  const token = window.localStorage.getItem("token");
  if (token) {
    router.push({ name: "Feedbacks" });
  }
});

function handleLogin() {
  console.log("handleLogin");
}

function handleAccountCreate() {
  console.log("handleAccountCreate");
}
</script>
