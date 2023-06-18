<template>
  <button :class="`rounded-lg normal-case px-6 py-3 satoshi font-bold ${btnClass}`">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "ButtonCta",
  props: ["text", "btnClass"]
}
</script>