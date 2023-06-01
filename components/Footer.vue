<template>
  <div class="footer text-lg text-white flex flex-col">
    <img src="@/assets/images/line-vertical.svg" class="w-full mx-auto"/>
    <div class="flex lg:w-10/12 w-full justify-evenly align-center mx-auto">
      <div class="flex flex-col">
        <p v-for="(menu, index) in useMenu().value" :key="index">
          {{menu}}
        </p>
      </div>
      <div class="flex items-center justify-between lg:w-4/12">
        <div>
          <p class="font-bold mb-4 text-xl">Entre em contato</p>
          <p>Contato via email</p>
          <p>Contato via whatsapp</p>
        </div>
        <div>
          <p class="font-bold mb-4 text-xl">Nos acompanhe nas redes</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>
      </div>
      <div class="flex items-center">
        <img src="@/assets/images/logo-box-vertical.svg" class="w-full"/>
      </div>
    </div>
  </div>
</template>
<style>
.footer {
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 90vw;
}

.footer::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: .6rem;
  bottom: 0;
  left: 0;
  background: rgb(0,0,255);
  background: linear-gradient(90deg, rgba(0,0,255,1) 0%, rgba(145,13,255,1) 30%);
}
</style>