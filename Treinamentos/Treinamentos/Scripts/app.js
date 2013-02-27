var App = {};

App.listarTurmas = function (opt) {
    var el = new App.TurmasView().render().$el;
    $('#page').empty().append(el);
};

App.listarInstrutores = function () {
    App.instrutores.fetch();

    var el = new App.InstrutoresView({
        collection: App.instrutores
    }).render().$el;
    
    $('#page').empty().append(el);
}

App.formularioInstrutor = function (model) {
    var el = new App.FormularioInstrutorView({
        model: model
    }).render().$el;

    $('#page').empty().append(el);
}

App.novoInstrutor = function () {
    App.formularioInstrutor(new App.Instrutor);
};

App.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'instrutores': 'listarInstrutores',
        'instrutores/novo': 'novoInstrutor',
    },
    home: function () {
        App.listarTurmas();
    },
    listarInstrutores: function () {
        App.listarInstrutores();
    },
    novoInstrutor: function () {
        App.novoInstrutor();
    },
});

App.MenuView = Backbone.View.extend({
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

App.TurmasView = Backbone.View.extend({
    template: _.template($('#turmasTp').html()),
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});

App.Instrutor = Backbone.Model.extend({
    urlRoot: '/api/instrutores/'
});

App.Instrutores = Backbone.Collection.extend({
    url: '/api/instrutores/',
    model: App.Instrutor
});

App.InstrutoresView = Backbone.View.extend({
    template: _.template($('#instrutoresTp').html()),
    initialize: function () {
        this.collection.on('reset', this.renderData, this);
    },
    events: {
        'click [data-action=new]': 'new'
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    renderData: function () {
        var tbody = this.$('tbody');
        this.collection.each(function (instrutor) {
            var view = new App.InstrutorView({
                model: instrutor,
            });
            view.$el.appendTo(tbody);
            view.render();
        }, this);
    },
    'new': function (e) {
        e.preventDefault();
        App.novoInstrutor();
        App.router.navigate('instrutores/novo');
    }
});

App.InstrutorView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#instrutorTp').html()),
    render: function () {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
    }
});

App.FormularioInstrutorView = Backbone.View.extend({
    template: _.template($('#formularioInstrutorTp').html()),
    events: {
        'click [data-action=cancel]': 'cancel',
        'click [data-action=submit]': 'submit'
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    submit: function () {
        this.model.save({
            nome: this.$('[name=nome]').val()
        }, {
            success: this.listarInstrutores
        });
    },
    cancel: function () {
        this.listarInstrutores();
    },
    listarInstrutores: function () {
        App.listarInstrutores();
        App.router.navigate('instrutores');
    }
});

App.router = new App.Router();
App.menuView = new App.MenuView();
App.instrutores = new App.Instrutores();

Backbone.history.start();