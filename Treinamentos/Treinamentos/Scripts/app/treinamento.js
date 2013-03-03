define(['app/treinamento/model', 'app/treinamento/collection'],
   function (Model, Collection) {
       App.treinamentosBootstrap = function () {
           var treinamentos = JSON.parse($('#treinamentos').html())
           App.treinamentos.reset(treinamentos, { parse: true })
       };

       App.treinamentos = new Collection();

       return {
           Model: Model,
           Collection: Collection
       };
   });