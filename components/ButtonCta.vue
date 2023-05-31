<template>
  <button :class="`rounded-lg normal-case lg:px-6 lg:py-3 satoshi font-bold ${btnClass}`">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "ButtonCta",
  props: ["text", "btnClass"]
}
</script>