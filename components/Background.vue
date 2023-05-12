<template>
    <div class="w-screen back">
        <div class="bg-[#3F00C6] opacity-30 fixed rounded-full obj-dril-left animate-pulse"></div>
        <div class="bg-[#6B00C6] opacity-30 fixed rounded-full obj-dril-right animate-pulse"></div>
    </div>
</template>
<style>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.obj-dril-left {
  left: -76vw;
  bottom: 12vh;
  filter: blur(250px);
  height: 80vh;
  width: 1953px;
  animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.obj-dril-right {
  right: -76vw;
  bottom: 12vh;
  filter: blur(250px);
  height: 80vh;
  width: 1953px;
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.back {
  z-index: -10;
  min-height: 100%;
}
</style>