<template>
  <section id="clientes" class="bg-white lg:py-24 py-10 clientes relative">
    <div class="mx-auto container">
      <div class="w-full text-center lg:mb-0 mb-14">
        <div class="flex justify-center relative">
          <h2 class="title-client text-gray-800 lg:text-3xl text-2xl satoshi-black font-black relative lg:w-full w-8/12">
            O que nossos clientes dizem sobre nós
          </h2>
        </div>
      </div>
      <div class="lg:w-8/12 w-11/12 mx-auto grid lg:grid-cols-12 grid-cols-1 gap-5 lg:mt-24">
        <div class="lg:col-span-4">
          <div class="w-full bg-white shadow shadow-2xl rounded-b-lg text-center relative">
            <img src="@/assets/images/quote.svg" class="absolute lg:-right-6 -right-3 -top-6"/>
            <figure><img class="w-full" src="@/assets/images/catia.jpg" alt="Cátia Damasceno" /></figure>
            <div class="card-body text-black p-3 rounded-b-lg">
              <h6 class="text-xl font-black satoshi-black -mb-2">Cátia Damasceno</h6>
              <span class="text-sm satoshi font-normal">Influenciadora Digital</span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7 lg:col-start-6">
          <p class="depoimento text-xl text-black font-normal mb-4 relative text-left">
            "Estou muito satisfeita com os serviços prestados pela DRIL.
            É uma agência extremamente profissional e ofereçem serviços de alta qualidade em criação e gerenciamento de sites. Além disso, sua equipe está sempre disponível para ajudar em qualquer momento, o que nos proporciona uma grande tranquilidade. Eu os recomendo altamente como parceiros de negócios para qualquer empresa que precise de serviços de marketing digital.""
          </p>
          <div class="redes grid lg:grid-cols-4 grid-cols-3 gap-1 mb-8">
            <a href="https://www.youtube.com/@CatiaDamasceno" target="_blank" class="flex items-center cursor-pointer hover:-translate-y-2 transition duration-150 ease-out hover:ease-in hover:text-[#8A00FF] text-black">
              <img src="@/assets/images/yt-gradient-icon.svg" class="mr-2">
              <p class="text-xs leading-none">
                <b class="text-sm">10 milhões</b> <br/> de inscritos
              </p>
            </a>
            <a href="https://www.instagram.com/catiadamasceno/" target="_blank" class="flex items-center cursor-pointer hover:-translate-y-2 transition duration-150 ease-out hover:ease-in hover:text-[#8A00FF] text-black">
              <img src="@/assets/images/ig-gradient-icon.svg" class="mr-2">
              <p class="text-xs leading-none">
                <b class="text-sm">8 milhões</b> <br/> de inscritos
              </p>
            </a>
            <a href="https://www.tiktok.com/@catiadamascenooficial" target="_blank" class="flex items-center cursor-pointer hover:-translate-y-2 transition duration-150 ease-out hover:ease-in hover:text-[#8A00FF] text-black">
              <img src="@/assets/images/tk-gradient-icon.svg" class="mr-2">
              <p class="text-xs leading-none">
                <b class="text-sm">8 milhões</b> <br/> de inscritos
              </p>
            </a>
          </div>
          <a href="#form">
            <ButtonCta btnClass="lg:w-9/12 w-full bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
              Vamos conversar
            </ButtonCta>
          </a>
        </div>
      </div>
    </div>
    <!-- <img src="@/assets/images/logo-elemento-blue.svg" class="logo"> -->
  </section>
</template>
<style>
  /*.clientes p.depoimento:before {
    content: '';
    width: 5px;
    height: 100%;
    border-radius: 2px;
    position: absolute;
    left: -1rem;
    top: 0rem;
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  } */

  .clientes .logo {
    position: absolute;
    right: -10rem;
    top: 30%;
    transform: rotate(50deg);
  }

  .title-client::before {
    content: '';
    position: absolute;
    height: 4px;
    top: -0.8rem;
    border-radius: 15px;
    width: 15vw;
    left: 50%;
    transform: translate(-50%, 0);
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  }

  .redes a:hover {
    fill: #8A00FF !important;
  }

  @media (max-width: 700px) {
    .title-client::before {
      width: 24vw;
    }
  }
</style>