var App = {};

App.formatDate = function (d) {
    var date = d.getDate();
    var month = d.getMonth();
    month++;
    var year = d.getFullYear();
    return date + "/" + month + "/" + year;
};

App.formatDatePeriod = function (x, y) {
    return App.formatDate(x) + ' a ' + App.formatDate(y);
};

App.listarTurmas = function (opt) {
    App.turmas.fetch();

    var el = new App.TurmasView({
        collection: App.turmas
    }).render().$el;

    $('#page').empty().append(el);
};

App.formularioTurma = function (model) {
    var el = new App.FormularioTurmaView({
        model: model
    }).render().$el;

    $('#page').empty().append(el);
}

App.novaTurma = function () {
    App.formularioTurma(new App.Turma);
};

App.listarInstrutores = function () {
    App.instrutores.fetch();

    var el = new App.InstrutoresView({
        collection: App.instrutores
    }).render().$el;

    $('#page').empty().append(el);
};

App.formularioInstrutor = function (model) {
    var el = new App.FormularioInstrutorView({
        model: model
    }).render().$el;

    $('#page').empty().append(el);
};

App.novoInstrutor = function () {
    App.formularioInstrutor(new App.Instrutor);
};

App.editarInstrutor = function (instrutor) {
    App.formularioInstrutor(instrutor);
};

App.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'turmas/nova': 'novaTurma',
        'instrutores': 'listarInstrutores',
        'instrutores/novo': 'novoInstrutor',
        'instrutores/:id': 'editarInstrutor'
    },
    home: function () {
        App.listarTurmas();
    },
    novaTurma: function () {
        App.novaTurma();
    },
    listarInstrutores: function () {
        App.listarInstrutores();
    },
    novoInstrutor: function () {
        App.novoInstrutor();
    },
    editarInstrutor: function (id) {
        new App.Instrutor({
            id: id,
        }).fetch({
            success: function (model) {
                App.editarInstrutor(model);
            }
        });
    }
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

App.ComboView = Backbone.View.extend({
    template: _.template($('#opcaoComboTp').html()),
    initialize: function () {
        this.collection.on('reset', this.render, this);
        this.collection.fetch();
    },
    render: function () {
        if (this.rendered) {
            alert("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuurgh");
        }

        var html = '<option value="">Selecione</option>';
        this.collection.each(function (model) {
            var option = this.template({
                nome: model.attributes.nome,
                valor: model.id
            });
            html += option;
        }, this);
        this.$el.html(html);

        this.rendered = true;
    }
});

App.Turma = Backbone.Model.extend({
    urlRoot: '/api/turmas/',
    parse: function (data) {
        var attributes = {
            id: data.id,
            inicio: new Date(Date.parse(data.inicio)),
            fim: new Date(Date.parse(data.fim)),
            codigoTreinamento: data.treinamento.id,
            nomeTreinamento: data.treinamento.nome,
            codigoInstrutor: data.instrutor.id,
            nomeInstrutor: data.instrutor.nome
        };
        return attributes;
    },
    toJSON: function () {
        var json = {
            inicio: this.attributes.inicio,
            fim: this.attributes.fim,
            treinamento: {
                id: this.attributes.codigoTreinamento
            },
            instrutor: {
                id: this.attributes.codigoInstrutor
            }
        };
        return json;
    },
});

App.Turmas = Backbone.Collection.extend({
    url: '/api/turmas/',
    model: App.Turma
});

App.Treinamento = Backbone.Model.extend({
});

App.Treinamentos = Backbone.Collection.extend({
    url: '/api/treinamentos/',
    model: App.Treinamento
});

App.TurmasView = Backbone.View.extend({
    template: _.template($('#turmasTp').html()),
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
        this.collection.each(function (turma) {
            var view = new App.TurmaView({
                model: turma,
                tagName: 'tr'
            });
            view.$el.appendTo(tbody);
            view.render();
        }, this);
    },
    'new': function (e) {
        e.preventDefault();
        App.novaTurma();
        App.router.navigate('turmas/nova');
    }
});

App.TurmaView = Backbone.View.extend({
    template: _.template($('#turmaTp').html()),
    render: function () {
        var json = _.extend(
            {},
            this.model.attributes, {
                periodo: App.formatDatePeriod(this.model.attributes.inicio, this.model.attributes.fim)
            });

        var data = { data: json };
        this.$el.html(this.template(data));
        return this;
    }
});

App.FormularioTurmaView = Backbone.View.extend({
    template: _.template($('#formularioTurmaTp').html()),
    events: {
        'click [data-action=cancel]': 'cancel',
        'click [data-action=submit]': 'submit'
    },
    render: function () {
        this.$el.html(this.template());
        this.carregarCombos();
        return this;
    },
    submit: function () {
        this.model.save({
            codigoTreinamento: this.$('[name=codigoTreinamento]').val(),
            codigoInstrutor: this.$('[name=codigoInstrutor]').val(),
            inicio: this.$('[name=inicio]').val(),
            fim: this.$('[name=fim]').val(),
        }, {
            success: this.listarTurmas
        });
    },
    cancel: function () {
        this.listarTurmas();
    },
    listarTurmas: function () {
        App.listarTurmas();
        App.router.navigate('');
    },
    carregarCombos: function () {
        var comboTreinamento = new App.ComboView({
            el: this.$('[name=codigoTreinamento]'),
            collection: App.treinamentos
        });

        var comboInstrutor = new App.ComboView({
            el: this.$('[name=codigoInstrutor]'),
            collection: App.instrutores
        });
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
    events: {
        'click [data-action=delete]': 'delete',
        'click': 'select'
    },
    render: function () {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
    },
    'delete': function (e) {
        e.preventDefault();
        e.stopPropagation();

        var that = this;
        this.model.destroy({
            success: function () {
                that.$el.fadeOut('slow', that.$el.remove);
            }
        });
    },
    select: function () {
        App.editarInstrutor(this.model);
        App.router.navigate('instrutores/' + this.model.id);
    }
});

App.FormularioInstrutorView = Backbone.View.extend({
    template: _.template($('#formularioInstrutorTp').html()),
    events: {
        'click [data-action=cancel]': 'cancel',
        'click [data-action=submit]': 'submit'
    },
    render: function () {
        var data = { data: this.model.toJSON() };
        this.$el.html(this.template(data));
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
App.turmas = new App.Turmas();
App.treinamentos = new App.Treinamentos();


Backbone.history.start();