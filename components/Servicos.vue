<template>
  <div class="servicos text-center container lg:pt-28 pt-20 pb-20 lg:px-0 px-4" id="servicos">
    <!-- <div class="background">
      <img src="@/assets/images/logo-elemento-gray.png" class=""/>
    </div> -->
    <div class="list lg:w-8/12 lg:px-8 mx-auto grid lg:grid-cols-5 grid-cols-1 gap-3">
      <div class="lg:col-span-3 mx-auto lg:px-2 flex flex-col justify-between">
        <div class="title flex">
          <h2 class="text-white lg:text-3xl text-2xl satoshi-black font-black relative w-full">
            O que podemos fazer <br/> pela sua empresa
          </h2>
        </div>
        <div class="flex items-center text-gray-600 mb-5 mt-10 lg:mb-3 justify-center lg:justify-start">
          <img src="@/assets/images/check.svg" class="mr-2 w-4"/>
          <h3 class="text-[11px] md:text-sm font-bold mb-0 text-[#808080] md:tracking-[1em] tracking-[0.5em]">RESULTADOS REAIS</h3>
        </div>
        <p class="text-center lg:text-left text-medium text-white text-[18px] lg:text-[20px] leading-7 lg:leading-8 md:text-lg mb-5 lg:mb-10 lg:pr-6">
          Nós sabemos que cada empresa é única e por isso, traçamos estratégias personalizadas para que a sua empresa alcance resultados incríveis na internet. Nossos serviços são focados em criar uma identidade única com personalidade para a sua marca, desenvolver e otimizar sistemas de alta performance, aumentar sua visibilidade e estabelecer uma comunicação direta e eficaz com o seu cliente ideal.
        </p>
      </div>
      <div class="lg:col-span-2 w-full lg:py-0 py-6 mx-auto text-white font-black text-xl flex flex-col mb-5 lg:justify-end justify-evenly">
        <div class="flex items-center mb-3 px-6 justify-between rounded-lg border-2 py-3 setor-icon">
          <img src="@/assets/images/design-icon.svg">
          <span class="font-bold">Design</span>
        </div>
        <div class="flex items-center mb-3 px-6 justify-between rounded-lg border-2 py-3 setor-icon">
          <img src="@/assets/images/engine-icon.svg">
          <span class="font-bold">Desenvolvimento</span>
        </div>
        <div class="flex items-center mb-3 px-6 justify-between rounded-lg border-2 py-3 setor-icon">
          <img src="@/assets/images/trafego-icon.svg">
          <span class="font-bold">Gestão de Tráfego</span>
        </div>
      </div>
      <div class="mx-auto w-full lg:col-span-5 mb-4">
        <div class="grid lg:grid-cols-4 grid-cols-2 gap-3 relative">
          <CardServico v-for="(card, index) in servicos" :key="index" :data="card" @click="activeCard(index)"/>
        </div>
      </div>
      <div class="mt-10 lg:col-span-5">
        <ButtonCta btnClass="bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
          Peça um orçamento
        </ButtonCta>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Servicos",
    data() {
      return {
        servicos: [
          { icons: ['dg'], title: 'Criação de logotipo <br/> e identidade visual', active: false},
          { icons: ['dg', 'tr'], title: 'Anúncios <br/> patrocinados', active: false},
          { icons: ['dg', 'tr'], title: 'Pacotes de criativos <br/> para redes sociais', active: false},
          { icons: ['dg', 'tr'], title: 'Pacote de criativos <br/> para anúncios', active: false},
          { icons: ['ds', 'tr'], title: 'Gestão de SEO', active: false},
          { icons: ['dg', 'ds'], title: 'Criação de <br/> aplicativos', active: false},
          { icons: ['dg', 'tr'], title: 'Criação de perfil estratégico para redes sociais', active: false},
          { icons: ['dg', 'tr'], title: 'Gestão de redes <br/> sociais', active: false},
          { icons: ['dg', 'ds'], title: 'Criação de sistemas personalizados', active: false},
          { icons: ['ds', 'tr'], title: 'Perfil da empresa <br/> no Google', active: false},
          { icons: ['dg', 'ds'], title: 'Criação de websites', active: false},
          { icons: ['ds'], title: 'Hospedagem de websites', active: false},
        ]
      };
    },
    methods: {
      activeCard(current) {
        this.servicos.forEach((serv, index) => {
          if(current != index) serv.active = false
          else serv.active = true
        });
      }
    }
  }
</script>
<style>
.servicos {
  margin: 0 auto;
}

.divisa {
  border-right: 1px solid;
  border: 1px solid;
  background: radial-gradient(100% 883599.95% at 100% 0%, rgba(255, 255, 255, 0) 0%, #FFFFFF 50.06%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%);
}

.background {
  border-radius: 642px;
  background: #303030;
  filter: blur(250px);
  width: 600px;
  height: 600px;
  position: absolute;
  left: -23%;
  transition-duration: .3s;
}

.setor-icon {
  background: linear-gradient(198deg, #010101 0%, #3C3C3C 100%);
}
</style>