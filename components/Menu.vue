<template>
  <div class="menu flex flex-row justify-between satoshi mx-auto">
    <img src="@/assets/images/logo.svg" class="w-1/10">
    <div class="text-xl text-white justify-evenly flex w-7/12 items-center font-lighter">
      <p v-for="(menu, index) in useMenu().value" :key="index">{{ menu }}</p>
      <ButtonCta btnClass="text-2xl px-10 border text-white normal-case border-white">
        Vamos conversar
      </ButtonCta>
    </div>
  </div>
</template>
<style>
.menu {
  padding: 5rem 3rem;
}

.menu p {
  font-weight: 400;
}
</style>