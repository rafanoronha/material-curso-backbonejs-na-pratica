define([],
    function () {
        var ItemView = Marionette.ItemView.extend({
            tagName: 'tr',
            template: '#instrutorTp',
            events: {
                'click [data-action=delete]': 'delete',
                'click': 'select'
            },
            'delete': function (e) {
                e.preventDefault();
                e.stopPropagation();

                var that = this;
                this.model.destroy({ wait: true });
            },
            select: function () {
                App.editarInstrutor(this.model);
                App.router.navigate('instrutores/' + this.model.id);
            }
        });
        return ItemView;
    });