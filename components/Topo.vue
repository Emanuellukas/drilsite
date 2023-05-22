<template>
  <section class="grid grid-cols-3 gap-4 items-center w-5/6 relative py-10 mx-auto lg:pl-12 sm:pl-2">
    <div class="col-span-2">
      <h1 class="text-7xl text-white mb-7 leading-tight font-black">
          A parceria ideal para <br /> sua expansão digital.
      </h1>
      <p class="text-2xl text-white text-left w-11/12 lg:mb-10 mb-4">
          Alcance ótimos resultados na internet trabalhando de forma colaborativa com profissionais especializados em dar vida e personalidade para a sua marca, otimizar seus sistemas e <br/> aumentar a sua presença digital.
      </p>
      <ButtonCta btnClass="text-2xl lg:w-2/4 text-black bg-white normal-case">
        Vamos conversar
      </ButtonCta>
    </div>
    <div class="relative h-full col-span-1 sm:hidden lg:block">
      <img src="@/assets/images/hero.svg" class="absolute hero">
    </div>
    <div class="col-span-3 _text-center lg:pt-20 sm:pt-5">
      <img src="@/assets/images/arrow-down.svg" class="mx-auto"/>
    </div>
  </section>
</template>
<style>
  img.hero {
    min-width: 32rem;
    top: -6rem;
    left: -5rem;
  }
</style>