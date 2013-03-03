require.config({
    paths: {
        "jquery": "libs/jquery-1.9.0",
        "bootstrap": "libs/bootstrap",

        "underscore": "libs/underscore",
        "backbone": "libs/backbone",
        "marionette": "libs/backbone.marionette",

        "validation": "libs/backbone-validation",
        "stickit": "libs/backbone.stickit"
    },
    shim: {
        "bootstrap": ["jquery"],
        "backbone": {
            "deps": ["underscore", "jquery"]
        },
        "marionette": ["backbone"],
        "validation": ["backbone"],
        "stickit": ["backbone"]
    }
});

require(["bootstrap", "backbone", "marionette", "validation", "stickit"],
    function () {
        Backbone.Validation.configure({
            forceUpdate: true
        });
        _.extend(Backbone.Validation.callbacks, {
            valid: function (view, attr, selector) {
                var input = view.$('[' + selector + '="' + attr + '"]:not([data-mode=alt])');
                if (input.data('tooltip')) {
                    input.tooltip('destroy');
                }
            },
            invalid: function (view, attr, error, selector) {
                var input = view.$('[' + selector + '="' + attr + '"]:not([data-mode=alt])');
                input.tooltip({
                    placement: 'bottom',
                    trigger: 'manual',
                    title: error
                });
                input.tooltip('show');
            }
        });

        $(document).ajaxError(function (event, jqxhr, settings, exception) {
            var badRequestMessage = function (jqxhr) {
                var defaultMsg = "Solicitação inválida";
                var msg = jqxhr.responseText || defaultMsg;
                return msg;
            };

            var map = {
                400: badRequestMessage(jqxhr),
                500: "Servidor falhou o processamento da solicitação"
            };
            var message = _.result(map, jqxhr.status) || "Erro ao comunicar com o servidor";
            alert(message);

            if (400 !== jqxhr.status) {
                throw new Error("Erro 500 na integração:\n" + jqxhr.responseText);
            }
        });

        window.onerror = function (msg, url, lineNumber) {
            var data = JSON.stringify({
                msg: msg,
                url: url,
                lineNumber: lineNumber
            });

            $.ajax({
                type: "POST",
                url: "/api/errors",
                data: data,
                contentType: "application/json; charset=utf-8",
            });

            return true;
        };

        window.App = {};
        
        require(["app"],
            function () {
                Backbone.history.start();
            });
    });