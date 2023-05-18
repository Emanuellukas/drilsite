<template>
  <button :class="`btn rounded-full normal-case ${btnClass}`">
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "ButtonCta",
  props: ["text", "btnClass"]
}
</script>