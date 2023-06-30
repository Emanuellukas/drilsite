<template>
  <section class="container mx-auto grid lg:grid-cols-3 grid-col-1 gap-0 lg:gap-4 items-center lg:px-0 px-6 lg:w-5/6 w-full relative lg:py-10 mx-auto">
    <div class="lg:col-span-2">
      <h1 class="lg:text-7xl text-left text-white lg:mb-7 mb-2 leading-11 lg:leading-tight font-black md:w-11/12 text-[40px]">
          A parceria ideal para sua expansão digital.
      </h1>
      <p class="lg:text-2xl md:text-xl font-bold text-[20px] leading-7 text-[#B0B0B0] text-left w-full lg:w-10/12 lg:mb-10 mb-3">
          Alcance ótimos resultados na internet trabalhando de forma colaborativa com profissionais especializados em dar vida e personalidade para a sua marca, otimizar seus sistemas e aumentar a sua presença digital.
      </p>
      <a href="#form">
        <ButtonCta btnClass="bg-[#8A00FF] md:w-1/3 w-full lg:my-0 my-8 md:text-2xl text-[24px] text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
          Vamos conversar
        </ButtonCta>
      </a>
    </div>
    <div class="relative h-full lg:col-span-1 lg:block lg:mb-0 mb-2">
      <img src="@/assets/images/hero.svg" class="lg:absolute hero">
      <!-- <img src="@/assets/images/hero.svg" class="lg:hidden"> -->
    </div>
    <div class="lg:col-span-3 _text-center lg:pt-20 sm:pt-5">
      <img src="@/assets/images/arrow-down.svg" class="mx-auto cursor-pointer"/>
    </div>
  </section>
</template>
<style>
@media (min-width: 800px) {
  img.hero {
    min-width: 32rem;
    top: -6rem;
    left: -5rem;
  }
}
</style>