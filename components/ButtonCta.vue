<template>
  <button :class="`btn rounded-full normal-case ${btnClass}`">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "ButtonCta",
  props: ["text", "btnClass"]
}
</script>