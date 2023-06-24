<template>
  <button :class="`rounded-lg normal-case px-6 py-3 satoshi font-bold duration-150 ${btnClass}`" @click="sendWhats">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "ButtonCta",
  props: ["text", "btnClass"],
  methods:{
    sendWhats(){
      window.open('https://wa.link/5nte7p', '_blank');
    }
  }
}
</script>