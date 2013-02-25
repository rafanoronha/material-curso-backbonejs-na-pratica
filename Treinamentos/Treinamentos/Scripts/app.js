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

App.TurmasView = Backbone.View.extend({
    template: _.template($('#turmasTp').html()),
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});

App.router = new App.Router();
Backbone.history.start();