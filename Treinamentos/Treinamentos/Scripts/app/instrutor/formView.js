define([],
    function () {
        var FormView = Backbone.View.extend({
            template: _.template($('#formularioInstrutorTp').html()),
            events: {
                'click [data-action=cancel]': 'cancel',
                'click [data-action=submit]': 'submit'
            },
            bindings: {
                '[name=nome]': 'nome'
            },
            initialize: function () {
                Backbone.Validation.bind(this);
            },
            render: function () {
                var data = { data: this.model.toJSON() };
                this.$el.html(this.template(data));
                this.stickit();
                return this;
            },
            submit: function () {
                if (this.model.isValid(true)) {
                    this.model.save({}, { success: this.listarInstrutores });
                }
            },
            cancel: function () {
                this.listarInstrutores();
            },
            listarInstrutores: function () {
                App.listarInstrutores();
                App.router.navigate('instrutores');
            }
        });
        return FormView;
    });