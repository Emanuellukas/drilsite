<template>
  <div class="relative" style="z-index: 0">
    <div class="background"></div>
    <!-- <div class="background right"></div> -->
    <Menu />
    <Topo />
    <Servicos />
    <Clientes />
    <Sobre />
    <Footer />
  </div>
</template>
<script>
export default defineNuxtComponent({
  name: 'App', 
  head() {
    return {
      title: 'DRIL | Marketing Digital',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'drilmarketing',
          name: 'Agência DRIL',
          content: 'A parceria ideal para sua expansão digital.'
        }
      ]
    }
  },
  scrollToTop: true
})
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
      font-weight: 700;
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

  @font-face {
      font-family: "Satoshi";
      src: url(./public/fonts/Satoshi-Medium.otf) format("truetype");
      font-weight: 500;
  }

  html {
    scroll-behavior: smooth;
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

  .title h2 {
    display: inline;
    text-align: left;
  }

  .title h2:before {
    content: '';
    display: flex;
    width: 220px;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: -.5rem;
    background: linear-gradient(2deg, #AA00FF 6.93%, #4300F1 109.99%);
  }

  .background {
    width: 425px;
    height: 515px;
    position: absolute;
    left: -20rem;
    top: 100vh;
    z-index: -1;
    border-radius: 515px;
    background: #404040;
    filter: blur(300px);
  }

  .background.right {
    right: -20rem;
    top: 150vh;
    left: unset;
  }

  @media (max-width: 890px) {
    .title h2:before {
      left: 34%;
      width: 110px;
    }

    .leading-11 {
      line-height: 48px;
    }

    .title h2 {
      text-align: center;
    }

    .background {
      top: 50vh;
    }
  }
</style>
