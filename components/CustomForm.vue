<template>
  <div id="form" class="w-full rounded-lg">
    <h4 class="text-4xl text-gray-900 mb-3">Fale com nossos especialistas</h4>
    <p class="text-sm text-gray-500">Preencha os campos abaixo para entrar em contato conosco</p>
    <form action="" class="grid lg:grid-cols-2 grid-cols-1 gap-3 lg:w-6/12 w-full mx-auto mt-10">
      <input type="text" placeholder="Nome" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400">
      <input type="text" placeholder="Telefone ex.: dd988884444" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400">
      <input type="email" placeholder="E-mail" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400">
      <input type="text" placeholder="Empresa" class="bg-gray-200 px-2 py-3 rounded-md placeholder:text-gray-400">
      <textarea class="lg:col-span-2 bg-gray-200 p-3 rounded-md" name="objetivo" placeholder="Objetivo de marketing" rows="10"></textarea>
      <button-cta btnClass="mt-6 lg:col-span-2 col-span-1 mx-auto bg-[#8A00FF] text-2xl text-white normal-case shadow-lg hover:shadow-[#8A00FF]/50">
        Enviar formulário
      </button-cta>
    </form>
  </div>
</template>