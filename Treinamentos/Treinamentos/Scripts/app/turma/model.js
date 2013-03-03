define([],
    function () {
        var Model = Backbone.Model.extend({
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
        return Model;
    });