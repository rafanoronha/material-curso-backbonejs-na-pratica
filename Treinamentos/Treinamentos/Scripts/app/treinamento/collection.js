define(['app/treinamento/model'],
    function (Model) {
        var Collection = Backbone.Collection.extend({
            url: '/api/treinamentos/',
            model: Model
        });
        return Collection;
    });