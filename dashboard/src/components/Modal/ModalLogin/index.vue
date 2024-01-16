<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Entre na sua conta
    </h1>
    <button
      type="button"
      class="text-4xl text-gray-600"
      @click="modal.close"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label
        for=""
        class="block"
      >
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100
          border-2 border-transparent rounded"
          :class="!!state.email.errorMessage && 'border-brand-danger'"
          placeholder="john.doe@mail.com"
          type="email"
        >
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >{{ state.email.errorMessage }}</span>
      </label>

      <label
        for=""
        class="block mt-9"
      >
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100
          border-2 border-transparent rounded"
          :class="!!state.password.errorMessage && 'border-brand-danger'"
          placeholder="*********"
          type="password"
        >
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >{{ state.password.errorMessage }}</span>
      </label>

      <button
        type="submit"
        :disabled="state.isLoading"
        :class="state.isLoading && 'opacity-50'"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main
        transition-all duration-150"
      >
        <Icon
          v-if="state.isLoading"
          class="animate-spin"
          name="Loading"
        />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import useModal from "../../../hooks/useModal";
import { validadeEmptyAndLenght3, validadeEmptyAndEmail } from "../../../utils/validators";
import Icon from "../../Icon/index.vue";
import services from "../../../services";

const { value: emailValue, errorMessage: emailErrorMessage } = useField("email", validadeEmptyAndEmail);
const { value: passwordValue, errorMessage: passwordErrorMessage } = useField("password", validadeEmptyAndLenght3);

const modal = useModal();
const router = useRouter();
const toast = useToast();

const state = ref({
  hasErrors: false,
  isLoading: false,
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage,
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage,
  },
});

async function handleSubmit() {
  try {
    toast.clear();
    state.value.isLoading = true;
    const { data, errors } = await services.auth.login({
      email: state.value.email.value,
      password: state.value.password.value,
    });

    if (!errors) {
      window.localStorage.setItem("token", data.token);
      router.push({ name: "Feedbacks" });
      state.value.isLoading = false;
      modal.close();
      return;
    }
    if (errors.status === 404) {
      toast.error("E-mail não encontrado");
    }
    if (errors.status === 401) {
      toast.error("E-mail ou senha inválidos");
    }
    if (errors.status === 400) {
      toast.error("Ocorreu um erro ao fazer login");
    }

    state.value.isLoading = false;
  } catch (error) {
    state.value.isLoading = false;
    state.value.hasErrors = !!error;
    toast.error("Ocorreu um erro ao fazer login");
  }
}
</script>
