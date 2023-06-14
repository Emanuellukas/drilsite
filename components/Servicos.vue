<template>
  <div class="servicos text-center container" id="servicos">
    <div class="title">
      <h2 class="text-white text-3xl satoshi-black font-black relative">
        O que podemos fazer pela sua empresa
      </h2>
    </div>
    <div class="list lg:mt-20 sm:mt-5 px-8">
      <div class="flex flex-col mx-auto">
        <div class="lg:w-6/12 w-10/12 mx-auto px-2 flex flex-col justify-between">
          <div class="flex items-center text-gray-600 mb-3 mx-auto">
            <img src="@/assets/images/check.svg" class="mr-5"/>
            <h3 class="text-sm font-bold mb-0 text-[#808080]" style="letter-spacing: 1em">RESULTADOS REAIS</h3>
          </div>
          <p class="text-gray-300 text-lg mb-5 lg:mb-10">Nós sabemos que cada empresa é única e por isso, traçamos estratégias personalizadas para que a sua alcance resultados incríveis na internet. Nossos serviços são focados em criar uma identidade única com personalidade para a sua marca, desenvolver e otimizar sistemas de alta performance, aumentar sua visibilidade e estabelecer uma comunicação direta e eficaz com o seu cliente ideal.</p>
        </div>
        <div class="lg:w-7/12 mx-auto text-white text-xl flex mb-5 justify-evenly">
          <div class="flex items-center">
            <img src="@/assets/images/design-icon.svg" class="setor-icon">
            <span>Design</span>
          </div>
          <img src="@/assets/images/line.svg" class="mx-10"/>
          <div class="flex items-center">
            <img src="@/assets/images/engine-icon.svg" class="setor-icon">
            <span>Desenvolvimento</span>
          </div>
          <img src="@/assets/images/line.svg" class="mx-10"/>
          <div class="flex items-center">
            <img src="@/assets/images/trafego-icon.svg" class="setor-icon">
            <span>Tráfego Pago</span>
          </div>
        </div>
        <div class="lg:w-8/12 mx-auto w-full mb-4">
          <div class="grid grid-cols-4 gap-3">
            <CardServico v-for="(card, index) in servicos" :key="index" :data="card"/>
          </div>
        </div>
        <div class="mt-4">
          <ButtonCta btnClass="bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
            Peça um orçamento
          </ButtonCta>
        </div>
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
          { icons: ['dg'], title: 'Criação de logotipo <br/> e identidade visual'},
          { icons: ['dg', 'tr'], title: 'Anúncios <br/> patrocinados'},
          { icons: ['dg', 'tr'], title: 'Pacotes de criativos <br/> para redes sociais'},
          { icons: ['dg', 'tr'], title: 'Pacote de criativos <br/> para anúncios'},
          { icons: ['ds', 'tr'], title: 'Gestão de SEO'},
          { icons: ['dg', 'ds'], title: 'Criação de <br/> aplicativos'},
          { icons: ['dg', 'tr'], title: 'Criação de perfil estratégico para <br/> redes sociais'},
          { icons: ['dg', 'tr'], title: 'Gestão de redes <br/> sociais'},
          { icons: ['dg', 'ds'], title: 'Criação de sistemas personalizados'},
          { icons: ['ds', 'tr'], title: 'Perfil da empresa no Google'},
          { icons: ['dg', 'ds'], title: 'Criação de websites'},
          { icons: ['ds'], title: 'Hospedagem de websites'},
        ]
      }
    }
  }
</script>
<style>
.servicos {
  padding: 7rem 0 10rem;
  margin: 0 auto;
}

.list .setor-icon {
  padding-right: 1rem;
}

.divisa {
  border-right: 1px solid;
  border: 1px solid;
  background: radial-gradient(100% 883599.95% at 100% 0%, rgba(255, 255, 255, 0) 0%, #FFFFFF 50.06%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%);
}
</style>