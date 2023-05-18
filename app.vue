<template>
  <!-- <Background /> -->
  <div>
    <Menu />
    <Topo />
    <Servicos />
    <Clientes />
  </div>
</template>
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
    background: #000000;
  }

  .satoshi {
    font-family: SatoshiRegular;
  }
  
  .satoshi-bold {
    font-family: SatoshiBold;
  }

  .satoshi-light {
    font-family: SatoshiLight;
  }

  .satoshi-black {
    font-family: SatoshiBlack;
  }

  .custom-container {
    margin: 0 auto;
    max-width: 90vw;
  }

  .title {
    padding-left: 7rem;
  }

  .title h2:before {
    content: '';
    width: 5px;
    height: 2.3rem;
    border-radius: 2px;
    position: absolute;
    left: -1rem;
    top: 0rem;
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  }
</style>
