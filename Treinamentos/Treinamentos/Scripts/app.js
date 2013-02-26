var App = {};

App.listarTurmas = function (opt) {
    var el = new App.TurmasView().render().$el;
    $('#page').empty().append(el);
};

App.Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    home: function () {
        App.listarTurmas();
    }
});

App.MenuView = Backbone.View.extend({
    el: 'nav',
    events: {
        'click [data-action=home]': 'home'
    },
    home: function (e) {
        e.preventDefault();
        App.listarTurmas();
        App.router.navigate('');
    }
});

App.TurmasView = Backbone.View.extend({
    template: _.template($('#turmasTp').html()),
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});

App.router = new App.Router();
App.menuView = new App.MenuView();
Backbone.history.start();