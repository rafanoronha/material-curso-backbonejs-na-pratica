﻿define(['app/instrutor'],
    function () {
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

       App.alternateInputMode = function (e) {
           e.preventDefault();
           var link = $(e.target);
           var current = link.siblings('[data-mode=current]');
           var alt = current.siblings('[data-mode=alt]');
           link.fadeOut('slow', function () {
               var currentText = link.text();
               var altText = link.attr('data-alt-text');
               link.text(altText);
               link.attr('data-alt-text', currentText);
               link.fadeIn('slow');
           });
           current.attr('data-mode', 'alt');
           current.fadeOut('slow', function () {
               current.val('').trigger('change');
               if (current.data('tooltip')) {
                   current.tooltip('destroy');
               }
               alt.attr('data-mode', 'current')
               alt.fadeIn('slow', function () {
                   alt.focus();
               });
           });
       };

       App.region = {
           el: $('#page'),
           show: function (view) {
               this.close();
               view.render();
               this.open(view);
               this.currentView = view;
           },
           close: function () {
               if (!this.currentView) { return; }
               this.currentView.remove();
               delete this.currentView;
           },
           open: function (view) {
               this.el.empty().append(view.el);
           }
       };

       App.listarTurmas = function (opt) {
           opt = opt || {};
           var options = _.extend({ fetch: true }, opt);
           if (options.fetch) {
               App.turmas.fetch();
           }

           var view = new App.TurmasView({
               collection: App.turmas
           });

           App.region.show(view);
       };

       App.formularioTurma = function (model, opt) {
           function abrirFormulario() {
               var view = new App.FormularioTurmaView({
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
           App.formularioTurma(new App.Turma, opt);
       };

       App.turmasBootstrap = function () {
           var turmas = JSON.parse($('#turmas').html())
           App.turmas.reset(turmas, { parse: true })
       };

       App.treinamentosBootstrap = function () {
           var treinamentos = JSON.parse($('#treinamentos').html())
           App.treinamentos.reset(treinamentos, { parse: true })
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
                       id: this.attributes.codigoTreinamento,
                       nome: this.attributes.nomeNovoTreinamento
                   },
                   instrutor: {
                       id: this.attributes.codigoInstrutor,
                       nome: this.attributes.nomeNovoInstrutor
                   }
               }
               return json;
           },
           validation: {
               inicio: {
                   required: true
               },
               fim: {
                   required: true
               },
               codigoTreinamento: {
                   required: function () {
                       return !this.get('nomeNovoTreinamento');
                   }
               },
               nomeNovoTreinamento: {
                   required: function () {
                       return !this.get('codigoTreinamento');
                   }
               },
               codigoInstrutor: {
                   required: function () {
                       return !this.get('nomeNovoInstrutor');
                   }
               },
               nomeNovoInstrutor: {
                   required: function () {
                       return !this.get('codigoInstrutor');
                   }
               },
           }
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
               this.listenTo(this.collection, 'reset', this.renderData);
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
               'click [data-action=submit]': 'submit',
               'click [data-action=alternate-input-mode]': 'alternateInputMode'
           },
           bindings: {
               '[name=codigoTreinamento]': {
                   observe: 'codigoTreinamento',
                   selectOptions: {
                       collection: 'App.treinamentos',
                       labelPath: 'nome',
                       valuePath: 'id',
                       defaultOption: {
                           label: 'Selecione',
                           value: ''
                       }
                   }
               },
               '[name=nomeNovoTreinamento]': 'nomeNovoTreinamento',
               '[name=codigoInstrutor]': {
                   observe: 'codigoInstrutor',
                   selectOptions: {
                       collection: 'App.instrutores',
                       labelPath: 'nome',
                       valuePath: 'id',
                       defaultOption: {
                           label: 'Selecione',
                           value: ''
                       }
                   }
               },
               '[name=nomeNovoInstrutor]': 'nomeNovoInstrutor',
               '[name=inicio]': 'inicio',
               '[name=fim]': 'fim'
           },
           initialize: function () {
               Backbone.Validation.bind(this);
           },
           render: function () {
               this.$el.html(this.template());
               this.stickit();
               return this;
           },
           submit: function () {
               if (this.model.isValid(true)) {
                   this.model.save({}, { success: this.listarTurmas });
               }
           },
           cancel: function () {
               this.listarTurmas();
           },
           listarTurmas: function () {
               App.listarTurmas();
               App.router.navigate('');
               this.remove();
           },
           alternateInputMode: function () {
               App.alternateInputMode.apply(this, arguments);
           }
       });

       App.router = new App.Router();
       App.menuView = new App.MenuView();
       App.turmas = new App.Turmas();
       App.treinamentos = new App.Treinamentos();
   });