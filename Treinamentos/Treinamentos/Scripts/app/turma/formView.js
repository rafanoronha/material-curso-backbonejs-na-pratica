define([],
   function () {
       var FormView = Backbone.View.extend({
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
       return FormView;
   });