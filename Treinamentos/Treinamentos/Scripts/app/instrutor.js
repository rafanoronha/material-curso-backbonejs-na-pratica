define(['app/instrutor/model', 'app/instrutor/collection', 'app/instrutor/collectionView', 'app/instrutor/itemView', 'app/instrutor/formView'],
    function (Model, Collection, CollectionView, ItemView, FormView) {
        App.listarInstrutores = function (opt) {
            opt = opt || {};
            var options = _.extend({ fetch: true }, opt);
            if (options.fetch) {
                App.instrutores.fetch();
            }

            var view = new CollectionView({
                collection: App.instrutores
            });

            App.region.show(view);
        };

        App.formularioInstrutor = function (model) {
            var view = new FormView({
                model: model
            });

            App.region.show(view);
        };

        App.novoInstrutor = function () {
            App.formularioInstrutor(new Model);
        };

        App.editarInstrutor = function (instrutor) {
            App.formularioInstrutor(instrutor);
        };

        App.instrutoresBootstrap = function () {
            var instrutores = JSON.parse($('#instrutores').html());
            App.instrutores.reset(instrutores, { parse: true })
        };

        App.instrutores = new Collection();

        return {
            Model: Model,
            Collection: Collection,
            CollectionView: CollectionView,
            ItemView: ItemView,
            FormView: FormView
        };
    });