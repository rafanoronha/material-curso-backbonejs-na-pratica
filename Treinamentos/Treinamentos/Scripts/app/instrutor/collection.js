define(['app/instrutor/model'],
   function (Model) {
       var Collection = Backbone.Collection.extend({
           url: '/api/instrutores/',
           model: Model
       });
       return Collection;
   });