<template>
  <section class="container mx-auto grid lg:grid-cols-3 grid-col-1 gap-0 lg:gap-4 items-center lg:px-0 px-6 lg:w-5/6 w-full relative lg:py-10 mx-auto">
    <div class="lg:col-span-2">
      <h1 class="lg:text-7xl text-5xl text-white mb-7 leading-tight font-black">
          A parceria ideal para <br /> sua expansão digital.
      </h1>
      <p class="lg:text-2xl text-xl text-white lg:text-left text-center w-full lg:w-11/12 lg:mb-10 mb-3">
          Alcance ótimos resultados na internet trabalhando de forma colaborativa com profissionais especializados em dar vida e personalidade para a sua marca, otimizar seus sistemas e <br/> aumentar a sua presença digital.
      </p>
      <a href="#form">
        <ButtonCta btnClass="bg-[#8A00FF] md:w-1/3 w-full lg:my-0 my-8 text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
          Vamos conversar
        </ButtonCta>
      </a>
    </div>
    <div class="relative h-full col-span-1 hidden lg:block">
      <img src="@/assets/images/hero.svg" class="absolute hero">
    </div>
    <div class="col-span-3 _text-center lg:pt-20 sm:pt-5">
      <img src="@/assets/images/arrow-down.svg" class="mx-auto cursor-pointer"/>
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