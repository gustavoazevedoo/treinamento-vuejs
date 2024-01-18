<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col  w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-gray-800">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full
        lg:w-1/2"
      >
        <span v-if="state.hasError">Erro ao carregar a api key</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>

        <div
          v-if="!state.hasError"
          class="flex ml-20 mr-5"
        >
          <Icon
            name="Copy"
            size="24"
            :color="palette.brand.graydark"
            class="cursor-pointer"
            @click="handleCopy"
          />
          <Icon
            name="Loading"
            size="24"
            :color="palette.brand.graydark"
            class="cursor-pointer ml-3"
            @click="handleGenerateApiKey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre
          v-else
          class="break-normal"
        >&lt;script src="https://gustavoazevedoo-feedbacker-widget.netlify.app?apiKey={{ store.User.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import HeaderLogged from "../../components/HeaderLogged/index.vue";
import ContentLoader from "../../components/ContentLoader/index.vue";
import useStore from "../../hooks/useStore";
import Icon from "../../components/Icon/index.vue";
import services from "../../services";
import { setApiKey } from "../../store/user";

import { palette } from "../../../palette";

const store = useStore();
const toast = useToast();
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

async function handleGenerateApiKey() {
  try {
    state.value.isLoading = true;
    const { data } = await services.users.generateApiKey();
    setApiKey(data.apiKey);
    state.value.isLoading = false;
  } catch (error) {
    handleError(error);
  }
}

async function handleCopy() {
  try {
    toast.clear();
    await navigator.clipboard.writeText(store.User.currentUser.apiKey);
    toast.success("Copiado!");
  } catch (error) {
    handleError(error);
  }
}
</script>
