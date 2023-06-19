<template>
  <div class="menu container mx-auto flex flex-row justify-between satoshi mx-auto lg:py-20 lg:px-12 px-10 py-10">
    <img src="@/assets/images/logo.svg" class="w-1/10">
    <div class="text-xl text-white justify-evenly w-7/12 items-center font-lighter hidden md:flex">
      <a :href="'#' + menu.route" class="menu-item cursor-pointer relative" v-for="(menu, index) in useMenu().value" :key="index">{{ menu.label }}</a>
      <ButtonCta btnClass="text-2xl px-10 border text-white normal-case border-white">
        Vamos conversar
      </ButtonCta>
    </div>
  </div>
</template>
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
</style>