<template>
  <div class="display-elements back z-0">
    <div class="left">
      <img src="@/assets/images/logo-elemento-purple.svg" class="animate-spin">
      <div class="gradient-blue-blur"></div>
    </div>
    <div class="right">
      <img src="@/assets/images/logo-elemento-blue.svg" class="animate-spin">
      <div class="gradient-purple-blur"></div>
    </div>
  </div>
</template>
<style>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.back {
  z-index: -10;
  min-height: 100%;
}

.display-elements {
  display: flex;
  z-index: -1;
  width: 100vw;
  position: absolute;
  justify-content: space-between;
}

.display-elements img {
  position: absolute;
  filter: grayscale(1);
  animation-duration: 90s;
}

.display-elements .left img {
  left: -11rem;
  top: 80vh;
}

.display-elements .right img {
  right: -7rem;
  top: 110vh;
  animation: spin-back 80s linear infinite;
}

.display-elements .gradient-blue-blur {
  width: 642px;
  height: 635px;
  background: #3F00C6;
  filter: blur(350px);
  position: absolute;
  left: -26rem;
  top: 125vh;
}

.display-elements .gradient-purple-blur {
  width: 425px;
  height: 515px;
  background: #6B00C6;
  filter: blur(350px);
  position: absolute;
  right: -26rem;
  top: 125vh;
}

@keyframes spin-back {
  100% {
    transform: rotate(-360deg);
  }
}
</style>