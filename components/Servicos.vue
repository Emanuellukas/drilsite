<template>
  <div class="servicos">
    <div class="title lg:mb-10 sm:mb-5">
      <h2 class="text-white text-3xl satoshi-black font-black relative">
        O que podemos fazer pela sua empresa
      </h2>
    </div>
    <div class="list">
      <div class="grid grid-cols-12 gap-2">
        <div class="lg:col-span-7 sm:col-span-12 text-white text-xl flex mb-5">
          <div class="flex items-center mx-auto pr-4">
            <img src="@/assets/images/design-icon.svg" class="setor-icon">
            <span>Design</span>
          </div>
          <img src="@/assets/images/line.svg" />
          <div class="flex items-center mx-auto pr-4">
            <img src="@/assets/images/engine-icon.svg" class="setor-icon">
            <span>Desenvolvimento</span>
          </div>
          <img src="@/assets/images/line.svg" />
          <div class="flex items-center mx-auto">
            <img src="@/assets/images/trafego-icon.svg" class="setor-icon">
            <span>Tráfego Pago</span>
          </div>
        </div>
        <div class="grid col-span-8 gap-5">
          <div class="grid grid-cols-4 gap-5">
            <CardServico v-for="(card, index) in servicos" :key="index" :data="card"/>
          </div>
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

.servicos .title {
  padding-left: 7rem;
}

.servicos h2:before {
  content: '';
  width: 5px;
  height: 2.3rem;
  border-radius: 2px;
  position: absolute;
  left: -1rem;
  top: 0rem;
  background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
}

.list .setor-icon {
  padding: 1rem;
}

.divisa {
  border-right: 1px solid;
  border: 1px solid;
  background: radial-gradient(100% 883599.95% at 100% 0%, rgba(255, 255, 255, 0) 0%, #FFFFFF 50.06%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%);
}
</style>