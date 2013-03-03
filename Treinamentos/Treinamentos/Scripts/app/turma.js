define(['app/turma/model', 'app/turma/collection', 'app/turma/collectionView', 'app/turma/itemView', 'app/turma/formView'],
   function (Model, Collection, CollectionView, ItemView, FormView) {
       App.listarTurmas = function (opt) {
           opt = opt || {};
           var options = _.extend({ fetch: true }, opt);
           if (options.fetch) {
               App.turmas.fetch();
           }

           var view = new CollectionView({
               collection: App.turmas
           });

           App.region.show(view);
       };

       App.formularioTurma = function (model, opt) {
           function abrirFormulario() {
               var view = new FormView({
                   model: model
               });
               App.region.show(view);
           }

           opt = opt || {};
           var options = _.extend({ fetchCombos: true }, opt);
           if (options.fetchCombos) {
               $.when(
                   App.instrutores.fetch(),
                   App.treinamentos.fetch()
               ).done(abrirFormulario);
           } else {
               abrirFormulario();
           }
       }

       App.novaTurma = function (opt) {
           App.formularioTurma(new Model, opt);
       };

       App.turmasBootstrap = function () {
           var turmas = JSON.parse($('#turmas').html())
           App.turmas.reset(turmas, { parse: true })
       };

       App.turmas = new Collection();

       return {
           Model: Model,
           Collection: Collection,
           CollectionView: CollectionView,
           ItemView: ItemView,
           FormView: FormView
       };
   });