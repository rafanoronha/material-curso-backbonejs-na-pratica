define([],
    function () {
        var ItemView = Backbone.View.extend({
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
        return ItemView;
    });