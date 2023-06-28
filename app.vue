<template>
  <div class="relative scroll-smooth" style="z-index: 0">
    <div class="whatsapp-cta">
      
    </div>
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
      font-family: "Satoshi";
      src: url(./public/fonts/Satoshi-Regular.otf) format("truetype");
      font-weight: 400;
  }

  @font-face {
      font-family: "Satoshi";
      src: url(./public/fonts/Satoshi-Bold.otf) format("truetype");
      font-weight: 600;
  }

  @font-face {
      font-family: "Satoshi";
      src: url(./public/fonts/Satoshi-Light.otf) format("truetype");
      font-weight: 300;
  }

  @font-face {
      font-family: "Satoshi";
      src: url(./public/fonts/Satoshi-Black.otf) format("truetype");
      font-weight: 800;
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
    display: inline-flex;
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
    top: -.5rem;
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  }
</style>
