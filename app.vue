<template>
  <div class="relative" style="z-index: 0">
    <!-- <Background /> -->
    <Menu />
    <Topo />
    <Servicos />
    <Clientes />
    <Sobre />
    <Footer />
  </div>
</template>
<script>
export default {
  name: 'App', 
}
</script>
<style>
  @font-face {
      font-family: "SatoshiRegular";
      src: url(../assets/fonts/Satoshi-Regular.otf);
  }

  @font-face {
      font-family: SatoshiBold;
      src: url(../assets/fonts/Satoshi-Bold.otf);
  }

  @font-face {
      font-family: SatoshiLight;
      src: url(../assets/fonts/Satoshi-Light.otf);
  }

  @font-face {
      font-family: SatoshiBlack;
      src: url(../assets/fonts/Satoshi-Black.otf);
  }

  body {
    background: #101010;
    font-family: "Satoshi";
  }

  .satoshi {
    font-family: "Satoshi";
  }


  .custom-container {
    margin: 0 auto;
    max-width: 90vw;
  }

  .title {
    display: inline;
    margin: 0 auto;
  }

  .title h2 {
    display: inline;
    text-align: center;
  }

  .title h2:before {
    content: '';
    display: flex;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: -1rem;
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  }
</style>
