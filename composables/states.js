export const useMenu = () => useState('menu', () => [
  {
    route: 'servicos',
    label: 'Serviços',
  }, {
    label: 'Clientes',
    route: 'clientes'
  }, {
    label: 'Sobre Nós',
    route: 'sobre',
  }
  // , {
  //   label: 'Fale Conosco',
  //   route: 'form'
  // }
]);