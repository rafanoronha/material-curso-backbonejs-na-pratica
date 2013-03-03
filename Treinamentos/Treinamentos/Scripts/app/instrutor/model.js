define([],
    function () {
        var Model = Backbone.Model.extend({
            urlRoot: '/api/instrutores/',
            validation: {
                nome: {
                    required: true
                }
            }
        });
        return Model;
    });