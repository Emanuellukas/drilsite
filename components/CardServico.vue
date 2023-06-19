<template>
  <div class="card bg-white rounded-md">
    <div class="flex p-3">
      <img src="@/assets/images/design-icon.svg" v-show="data.icons.includes('dg')">
      <img src="@/assets/images/engine-icon.svg" v-show="data.icons.includes('ds')">
      <img src="@/assets/images/trafego-icon.svg" v-show="data.icons.includes('tr')">
    </div>
    <div class="card-body p-2 text-center flex">
      <p class="text-black mx-auto my-auto text-base font-bold flex leading-tight mb-2" v-html="data.title"/>
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

.card {
  min-height: 8rem;
  max-height: 8rem;
}
</style>
