define([],
    function () {
        var Router = Backbone.Router.extend({
            routes: {
                '': 'home',
                'turmas/nova': 'novaTurma',
                'instrutores': 'listarInstrutores',
                'instrutores/novo': 'novoInstrutor',
                'instrutores/:id': 'editarInstrutor'
            },
            home: function () {
                App.listarTurmas({ fetch: false });
                App.turmasBootstrap();
            },
            novaTurma: function () {
                App.instrutoresBootstrap();
                App.treinamentosBootstrap();
                App.novaTurma({ fetchCombos: false });
            },
            listarInstrutores: function () {
                App.listarInstrutores({ fetch: false });
                App.instrutoresBootstrap();
            },
            novoInstrutor: function () {
                App.novoInstrutor();
            },
            editarInstrutor: function (id) {
                App.instrutoresBootstrap();
                App.editarInstrutor(App.instrutores.get(id));
            }
        });
        return Router;
    });