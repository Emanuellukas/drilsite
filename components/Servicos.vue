<template>
  <div class="servicos" id="servicos">
    <div class="title lg:mb-10 sm:mb-5">
      <h2 class="text-white text-3xl satoshi-black font-black relative">
        O que podemos fazer pela sua empresa
      </h2>
    </div>
    <div class="list px-8">
      <div class="w-7/12 text-white text-xl flex mb-5 justify-evenly">
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
      <div class="grid grid-cols-12 gap-4 mx-auto">
        <div class="col-span-7">
          <div class="grid grid-cols-4 gap-3">
            <CardServico v-for="(card, index) in servicos" :key="index" :data="card"/>
          </div>
        </div>
        <div class="col-span-5 px-10 flex flex-col justify-between">
          <div class="flex items-center mb-3">
            <img src="@/assets/images/check.svg" class="mr-3"/>
            <h3 class="text-sm font-bold mb-0 text-white">RESULTADOS REAIS</h3>
          </div>
          <p class="text-white text-lg mb-5">Nós sabemos que cada empresa é única e por isso, traçamos estratégias personalizadas para que a sua alcance resultados incríveis na internet. Nossos serviços são focados em criar uma identidade única com personalidade para a sua marca, desenvolver e otimizar sistemas de alta performance, aumentar sua visibilidade e estabelecer uma comunicação direta e eficaz com o seu cliente ideal.</p>
          <ButtonCta text="Contrate nossos serviços" btnClass="text-2xl text-black bg-white w-full mb-3"/>
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
  padding: 7rem 0;
  margin: 0 auto;
  max-width: 90vw;
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