<template>
  <footer class="footer text-lg text-white flex flex-col container lg:px-0 px-8">
    <img src="@/assets/images/line-vertical.svg" class="w-full mx-auto h-8"/>
    <div class="flex lg:flex-row flex-col w-full justify-evenly align-center mx-auto py-4">
      <div class="flex flex-col justify-between lg:text-lg lg:text-left mb-6 lg:mb-0">
        <a :href="'#' + menu.route" class="footer-menu-item text-xl font-bold self-end lg:self-start relative cursor-pointer lg:mb-1 mb-3" v-for="(menu, index) in useMenu().value" :key="index">
          {{menu.label}}
        </a>
      </div>
      <div class="flex lg:flex-row flex-col lg:items-center lg:text-center items-end text-right justify-between w-full lg:w-5/12 lg:mb-0 mb-8">
        <div class="lg:mb-0 mb-6">
          <p class="font-bold mb-4 lg:text-2xl text-3xl">Entre em contato</p>
          <a target="_blank" class="link" href="mailto: agenciadril@gmail.com">
            <img src="@/assets/images/email.svg">
            Contato via email
          </a>
          <a target="_blank" class="link" href="https://whatsa.me/5561994455643/?t=Teste%20de%20mensagem">
            <img src="@/assets/images/whatsapp.svg">
            Contato via whatsapp
          </a>
        </div>
        <div>
          <p class="font-bold mb-4 lg:text-2xl text-3xl">Siga-me os bons</p>
          <a target="_blank" class="link" href="https://www.instagram.com/agenciadril/">
            <img src="@/assets/images/instagram.svg">
            Instagram
          </a>
          <a target="_blank" class="link" href="https://www.linkedin.com/company/agenciadril/">
            <img src="@/assets/images/linkedin.svg">
            LinkedIn
          </a>
        </div>
      </div>
      <img src="@/assets/images/logo-box-vertical.png" class="lg:w-1/12 lg:ml-0 ml-auto w-3/12"/>
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

footer a {
  display: flex;
}

footer a img {
  margin: 0 1rem 0 0;
}

@media (max-width: 600px) {
  footer .link {
    justify-content: end;
    flex-direction: row-reverse;
  }
  footer .link img {
    margin: 0 0 0 1rem;
  }
}
</style>