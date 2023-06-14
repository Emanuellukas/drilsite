<template>
  <footer class="footer text-lg text-white flex flex-col container">
    <img src="@/assets/images/line-vertical.svg" class="w-full mx-auto"/>
    <div class="flex w-full justify-evenly align-center mx-auto py-4">
      <div class="flex flex-col">
        <a :href="'#' + menu.route" class="footer-menu-item relative cursor-pointer" v-for="(menu, index) in useMenu().value" :key="index">
          {{menu.label}}
        </a>
      </div>
      <div class="flex items-center justify-between lg:w-5/12">
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
  </footer>
</template>
<style>
footer {
  padding: 2rem 0;
  margin: 0 auto;
}

footer::after {
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

.footer-menu-item:before {
  content: '';
  display: flex;
  width: 2px;
  height: 0;
  border-radius: 2px;
  position: absolute;
  top: 0.5rem;
  left: -.5rem;
  transition-duration: .3s;
  background: linear-gradient(254.84deg, #AA00FF 68.96%, #0000FF 115.78%);
}

.footer-menu-item:hover:before {
  height: 1rem;
}
</style>