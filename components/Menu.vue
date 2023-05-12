<template>
    <div class="menu flex flex-row justify-between">
        <img src="@/assets/images/logo.svg" class="w-1/10">
        <div class="text-xl text-white justify-evenly flex w-7/12 items-center font-lighter">
            <p>Serviços</p>
            <p>Clientes</p>
            <p>Sobre Nós</p>
            <p>Fale Conosco</p>
            <button class="btn btn-outline btn-white text-white rounded-full px-10 py-2">
                Vamos Conversar
            </button>
        </div>
    </div>
</template>
<style>
.menu {
    padding: 5rem 3rem;
}

.menu p {
    margin-left: 1rem;
    margin-right: 1rem;
    font-family: 'Satoshi', sans-serif;
    font-weight: 400;
}
</style>