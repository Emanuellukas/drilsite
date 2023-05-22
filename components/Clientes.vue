<template>
  <section class="bg-white lg:py-24 clientes relative">
    <div class="custom-container">
      <div class="title lg:mb-20 sm:mb-5">
        <h2 class="text-black text-3xl satoshi-black font-black relative">
          O que podemos fazer pela sua empresa
        </h2>
      </div>
      <div class="w-9/12 mx-auto grid grid-cols-12 gap-5">
        <div class="col-span-4">
          <div class="card w-full bg-white shadow-2xl text-center relative">
            <img src="@/assets/images/quote.svg" class="absolute -right-6 -top-6"/>
            <figure><img class="w-full" src="@/assets/images/catia.jpg" alt="Cátia Damasceno" /></figure>
            <div class="card-body text-black p-3">
              <h6 class="text-xl font-black satoshi-black -mb-2">Cátia Damasceno</h6>
              <span class="text-sm satoshi font-normal">Influencer Digital</span>
            </div>
          </div>
        </div>
        <div class="col-span-7 col-start-6">
          <p class="depoimento text-xl text-black font-normal mb-4 relative">
            Estou extremamente satisfeita com os serviços prestados pela DRIL.
            É uma agência extremamente profissional e ofereçem serviços de alta qualidade em criação e gerenciamento de sites. Além disso, sua equipe está sempre disponível para ajudar em qualquer momento, o que nos proporciona uma grande tranquilidade. Eu os recomendo altamente como parceiros de negócios para qualquer empresa que precise de serviços de marketing digital.
          </p>
          <div class="redes grid grid-cols-4 gap-1 text-black lg:mb-8">
            <div class="flex items-center">
              <img src="@/assets/images/yt-gradient-icon.svg" class="mr-2">
              <p class="text-xs leading-none">
                <b class="text-sm">10 milhões</b> <br/> de inscritos
              </p>
            </div>
            <div class="flex items-center">
              <img src="@/assets/images/ig-gradient-icon.svg" class="mr-2">
              <p class="text-xs leading-none">
                <b class="text-sm">8 milhões</b> <br/> de inscritos
              </p>
            </div>
            <div class="flex items-center">
              <img src="@/assets/images/tk-gradient-icon.svg" class="mr-2">
              <p class="text-xs leading-none">
                <b class="text-sm">8 milhões</b> <br/> de inscritos
              </p>
            </div>
          </div>
          <div class="">
            <ButtonCta btnClass="hover:bg-black hover:text-white hover:border-black text-black btn-black w-2/3 btn-outline text-xl font-black border-2 PY-2">
              Vamos trabalhar juntos
            </ButtonCta>
          </div>
        </div>
      </div>
    </div>
    <img src="@/assets/images/logo-elemento-blue.svg" class="logo">
  </section>
</template>
<style>
  .clientes p.depoimento:before {
    content: '';
    width: 5px;
    height: 100%;
    border-radius: 2px;
    position: absolute;
    left: -1rem;
    top: 0rem;
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  }

  .clientes .logo {
    position: absolute;
    right: -10rem;
    top: 30%;
    transform: rotate(50deg);
  }
</style>