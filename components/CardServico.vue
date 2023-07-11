<template>
  <div class="card bg-white rounded-md flex flex-col relative justify-center">
    <div class="absolute top-0 left-0 p-3 flex">
      <img src="@/assets/images/design-purple-icon.svg" v-show="data.icons.includes('dg')">
      <img src="@/assets/images/engine-purple-icon.svg" v-show="data.icons.includes('ds')">
      <img src="@/assets/images/trafego-purple-icon.svg" v-show="data.icons.includes('tr')">
    </div>
    <div class="card-body p-2 text-center flex">
      <p class="mx-auto my-auto lg:text-base text-sm font-bold flex leading-tight" v-html="data.title"/>
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
