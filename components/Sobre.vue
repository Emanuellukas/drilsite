<template>
  <div id="sobre" class="sobre lg:px-0 px-5 relative text-center container lg:py-28 lg:pb-0 pt-16 pb-2">
    <div class="lg:w-9/12 lg:px-8 mx-auto grid lg:grid-cols-5 grid-cols-1 gap-3">
      <div class="lg:col-span-3 mx-auto lg:px-2 flex flex-col lg:justify-end justify-between">
        <div class="title flex">
          <h2 class="text-white lg:text-3xl text-2xl satoshi-black font-black relative w-full">
            Profissionais aptos a <br class="lg:hidden block"/> gerar <br class="hidden lg:block"/> resultados para <br class="lg:hidden block"/> o seu negócio
          </h2>
        </div>
        <div class="flex items-center text-gray-600 mb-5 mt-10 lg:mb-3 justify-center lg:justify-start">
          <img src="@/assets/images/check.svg" class="mr-2 w-4"/>
          <h3 class="text-[11px] md:text-sm font-bold mb-0 text-[#808080] md:tracking-[1em] tracking-[0.5em]">EQUIPE CAPACITADA</h3>
        </div>
        <p class="text-justify text-medium text-white lg:text-[20px] text-[16px] sm:leading-6 lg:leading-tight md:text-lg mb-5 lg:mb-10 lg:pr-6">
          Nossa equipe é composta por profissionais altamente capacitados com mais de 14 anos de experiência trabalhando estrategicamente em projeto complexos ao lado de grandes nomes do mercado de marketing digital. Possuímos um histórico de sucesso sempre ajudando a trazer soluções eficazes e inovadoras para a mesa.
        </p>
        <button-cta btnClass="mt-6 mx-auto bg-[#8A00FF] text-lg md:text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50 w-full hidden lg:block">
          Fale com a nossa equipe
        </button-cta>
      </div>
      <div class="grid grid-cols-2 gap-4 lg:col-span-2">
        <div v-for="(a, index) in equipe" :key="index" class="rounded-lg flex flex-col justify-end items-center bg-gradient-to-b from-[#A6A6A6] to-[#5A5A5A] shadow-2xl text-center h-[200px] md:h-[244px]">
          <img :src="'/'+a.img" alt="funcionario" class=" md:h-[154px] h-[130px]"/>
          <div class="card-body rounded-b-lg w-full text-[#404040] p-1 md:p-3  bg-white">
            <h6 class="text-[12px] md:text-xl font-black -mb-2">{{ a.name }}</h6>
            <span class="text-[10px] md:text-sm satoshi font-medium">{{ a.func }}</span>
          </div>
        </div>
      </div>
      <button-cta btnClass="mt-6 mx-auto bg-[#8A00FF] text-lg md:text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50 block lg:hidden">
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
        { name: "Ricardo Schmidt", func: "Designer", img: "ricardo_OK.png"},
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