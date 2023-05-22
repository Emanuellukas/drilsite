<template>
  <div class="sobre relative">
    <div class="backdrop">
      <div class="left">
        <div class="gradient-blue-blur"></div>
        <img src="@/assets/images/logo-elemento-blue.svg" class="logo" />
      </div>
      <div class="gradient-purple-blur right"></div>
    </div>
    <div class="title lg:mb-10 sm:mb-5">
      <h2 class="text-white text-3xl satoshi-black font-black relative">
        Profissionais aptos a gerar resultados para seu negócio
      </h2>
    </div>
    <div class="grid grid-cols-12 gap-5 mx-auto p-8">
      <div class="col-span-5 col-start-2 px-14 flex flex-col justify-center">
        <div class="flex items-center mb-3">
          <img src="@/assets/images/check.svg" class="mr-3"/>
          <h3 class="text-sm font-bold mb-0 text-white uppercase">Profissionais capacitados</h3>
        </div>
        <p class="text-white text-lg mb-5 font-light">Nossa equipe é composta por profissionais altamente capacitados com mais de 14 anos de experiência trabalhando estrategicamente em projeto complexos ao lado de grandes nomes do mercado de marketing digital. Possuimos um histórico de sucesso sempre ajudando a trazer soluções eficazes e inovadoras para a mesa.</p>
        <ButtonCta btnClass="text-2xl text-black bg-white w-full mb-3">
          Fale com nossa equipe
        </ButtonCta>
      </div>
      <div class="col-span-5 grid grid-cols-2 gap-4">
        <div v-for="(a, index) in equipe" :key="index" class="card bg-white shadow-2xl text-center relative">
          <figure><img class="w-full" src="@/assets/images/funcionario.jpg" alt="Cátia Damasceno" height="179px"/></figure>
          <div class="card-body text-black p-3">
            <h6 class="text-xl font-black satoshi-black -mb-2">{{ a.name }}</h6>
            <span class="text-sm satoshi font-normal">{{ a.func }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sobre",
  data() {
    return {
      equipe: [
        { name: "Douglas Matos", func: "Desenvolvedor"},
        { name: "Ricardo Schmidt", func: "Diretor de Arte"},
        { name: "Iury Toledo", func: "Gestor de Tráfego"},
        { name: "Lucas Emanuel", func: "Desenvolvedor"},
      ]
    }
  }
}
</script>
<style>
.sobre {
  padding: 7rem 0;
  margin: 0 auto;
  max-width: 90vw;
}

.sobre .logo {
  position: absolute;
  top: 40%;
  left: -14rem;
  transform: rotate(-160deg);
}

.sobre .backdrop .gradient-blue-blur {
  position: absolute;
  width: 348px;
  height: 514px;
  left: -10rem;
  top: 2rem;
  background: #0000FF;
  filter: blur(500px);
}

.sobre .backdrop .gradient-purple-blur {
  position: absolute;
  width: 477px;
  height: 474px;
  right: -25rem;
  top: 50%;
  background: #7C3FFF;
  filter: blur(500px);
}
</style>