<template>
  <div id="sobre" class="sobre lg:px-0 px-5 relative text-center container lg:py-28 pt-16 pb-2">
    <div class="title">
      <h2 class="text-white lg:text-3xl text-2xl satoshi-black font-black relative">
        Profissionais aptos a gerar resultados para seu negócio
      </h2>
    </div>
    <div class="flex flex-col lg:mt-24 mt-10 lg:mb-28 mb-8">
      <div class="lg:w-6/12 mx-auto flex flex-col justify-center">
        <div class="flex items-center text-gray-600 mb-3 mx-auto">
          <img src="@/assets/images/check.svg" class="mr-5"/>
          <h3 class="text-sm font-bold mb-0 text-[#808080]" style="letter-spacing: .8em">PROFISSIONAIS CAPACITADOS</h3>
        </div>
        <p class="text-white text-lg mb-5 font-light">Nossa equipe é composta por profissionais altamente capacitados com mais de 14 anos de experiência trabalhando estrategicamente em projeto complexos ao lado de grandes nomes do mercado de marketing digital. Possuimos um histórico de sucesso sempre ajudando a trazer soluções eficazes e inovadoras para a mesa.</p>
      </div>
      <div class="lg:w-8/12 w-full mx-auto mt-6 grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div v-for="(a, index) in equipe" :key="index" class="rounded-lg flex flex-col justify-end items-center bg-gradient-to-b from-[#A6A6A6] to-[#5A5A5A] shadow-2xl text-center h-[244px]">
       
          <img :src="'/'+a.img" alt="funcionario" class="h-[154px]"/>
          <div class="card-body rounded-b-lg w-full text-black p-3  bg-white">
            <h6 class="text-xl font-black satoshi-black -mb-2">{{ a.name }}</h6>
            <span class="text-sm satoshi font-normal">{{ a.func }}</span>
          </div>
        </div>
      </div>
      <button-cta btnClass="mt-6 mx-auto bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
        Fale com a nossa equipe
      </button-cta>
    </div>
    <custom-form />
  </div>
</template>
<script>
export default {
  name: "Sobre",
  data() {
    return {
      equipe: [
        { name: "Douglas Matos", func: "Desenvolvedor", img: "douglas_OK.png"},
        { name: "Ricardo Schmidt", func: "Diretor de Arte", img: "ricardo_OK.png"},
        { name: "Iury Toledo", func: "Gestor de Tráfego", img: "Iury_OK.png"},
        { name: "Lucas Emanuel", func: "Desenvolvedor", img: "lucas_OK.png"},
      ]
    }
  }
}
</script>
<style>
.sobre {
  margin: 0 auto;
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