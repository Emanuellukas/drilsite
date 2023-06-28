<template>
  <div class="menu container mx-auto flex flex-row justify-between satoshi mx-auto lg:py-20 lg:px-12 px-10 py-10">
    <a href="/" class="flex"><img src="@/assets/images/logo.svg" class="w-1/10"></a>
    <div class="text-xl text-white justify-evenly w-7/12 items-center font-lighter hidden md:flex">
      <a :href="'#' + menu.route" class="menu-item cursor-pointer relative" v-for="(menu, index) in useMenu().value" :key="index">{{ menu.label }}</a>
      <ButtonCta btnClass="text-2xl px-10 border text-white normal-case border-white">
        Vamos conversar
      </ButtonCta>
    </div>
    <button class="py-1 px-2 lg:hidden" @click="handleMenuClick()">
      <img src="@/assets/images/menu.svg" alt="Menu icon">
    </button>
    <dialog id="sidemenu" class="mr-0 min-h-screen my-0 bg-[#161616] lg:hidden p-6">
      <div class="text-xl flex flex-col text-white justify-between h-max w-full font-lighter text-right">
        <div class="flex flex-col">
          <a :href="'#' + menu.route" class="menu-item cursor-pointer relative mb-4" v-for="(menu, index) in useMenu().value" :key="index">{{ menu.label }}</a>
        </div>
        <ButtonCta btnClass="text-xl px-2 border text-white normal-case border-white">
          Vamos conversar
        </ButtonCta>
      </div>
    </dialog>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  methods: {
    handleMenuClick() {
      const sidemenu = document.getElementById('sidemenu');
      sidemenu.showModal();
    },
  },
  updated() {
    const dialog = document.getElementById('sidemenu');
    if(dialog) {
      dialog.addEventListener('click', function(event) {
      // Verificar se o backdrop foi clicado
      if (event.target === dialog) {
        console.log('entrou')
        event.target.close()
      }
    });
    }
  }
}
</script>
<style>
.menu p {
  font-weight: 400;
}

.menu-item:before {
  content: '';
  display: flex;
  width: 0;
  height: 2px;
  border-radius: 2px;
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  transition-duration: .3s;
  background: linear-gradient(254.84deg, #AA00FF 68.96%, #0000FF 115.78%);
}

.menu-item:hover:before {
  width: 100%;
}

#sidemenu::backdrop {
background: rgba(255, 255, 255, 0.19);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.9px);
-webkit-backdrop-filter: blur(5.9px);
}
</style>