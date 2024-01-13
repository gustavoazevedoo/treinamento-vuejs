<template>
  <header class="header">
    <div class="header-group">
      <div class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <img
            class="w-full"
            src="../../assets/images/logo_white.png"
            alt="Logo"
          >
        </div>

        <div class="flex items-center gap-10">
          <button
            type="button"
            class="font-bold text-lg text-white"
            @click="$emit('create-account')"
          >
            Crie uma conta
          </button>
          <button
            type="button"
            class="text-brand-main font-bold text-lg bg-white rounded-full py-2 px-6"
            @click="$emit('login')"
          >
            Entrar
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedback. <br>
          E faça seus clientes mais <br class="hidden lg:inline-block">
          felizes!
        </h1>
        <p class="font-medium text-lg text-white">
          Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
          simples widget na página.
        </p>
        <div>
          <button class="text-brand-main font-bold text-lg bg-white rounded-full py-2 px-6 mt-10">
            Crie uma conta grátis
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="postcss">
  .header {
    @apply bg-brand-main w-full flex justify-center;
    height: 700px;
  }

  .header-group {
    @apply flex flex-col w-4/5 max-w-6xl;

  }

  @media(min-width: 640px) {
    .header-group {
      background-image: url(../../assets/images/blue_balloons.png);
      background-size: 628px;
      background-position: 90% 100%;
      background-repeat: no-repeat;
    }
  }
</style>
