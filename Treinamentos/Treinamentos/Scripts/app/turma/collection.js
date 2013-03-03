define(['app/turma/model'],
   function (Model) {
       var Collection = Backbone.Collection.extend({
           url: '/api/turmas/',
           model: Model
       });
       return Collection;
   });