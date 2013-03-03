define(['app/instrutor', 'app/treinamento', 'app/turma'],
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

       App.router = new App.Router();
       App.menuView = new App.MenuView();
   });