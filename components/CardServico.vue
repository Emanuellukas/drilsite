<template>
  <div class="card bg-white rounded-md">
    <div class="flex p-3 pb-0">
      <img src="@/assets/images/design-icon.svg" v-show="data.icons.includes('dg')">
      <img src="@/assets/images/engine-icon.svg" v-show="data.icons.includes('ds')">
      <img src="@/assets/images/trafego-icon.svg" v-show="data.icons.includes('tr')">
    </div>
    <div class="card-body p-3 text-center flex pt-2">
      <p class="text-black mx-auto text-base font-bold flex items-center justify-center leading-tight mb-2" v-html="data.title"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardServico",
  props: {
    data: {
      default: []
    }
  },
}
</script>
<style>
.servicos .card img {
  width: .8rem;
  margin: 0 3px;
}
</style>
