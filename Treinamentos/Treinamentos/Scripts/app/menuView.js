define([],
    function () {
        var MenuView = Backbone.View.extend({
            el: 'nav',
            events: {
                'click [data-action=home]': 'home',
                'click [data-action=instrutores]': 'listarInstrutores'
            },
            home: function (e) {
                e.preventDefault();
                App.listarTurmas();
                App.router.navigate('');
            },
            listarInstrutores: function (e) {
                e.preventDefault();
                App.listarInstrutores();
                App.router.navigate('instrutores');
            }
        });
        return MenuView;
    });