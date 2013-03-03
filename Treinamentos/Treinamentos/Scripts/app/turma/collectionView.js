define(['app/turma/itemView'],
   function (ItemView) {
       var CollectionView = Backbone.View.extend({
           template: _.template($('#turmasTp').html()),
           initialize: function () {
               this.listenTo(this.collection, 'reset', this.renderData);
           },
           events: {
               'click [data-action=new]': 'new'
           },
           render: function () {
               this.$el.html(this.template());
               return this;
           },
           renderData: function () {
               var tbody = this.$('tbody');
               this.collection.each(function (turma) {
                   var view = new ItemView({
                       model: turma,
                       tagName: 'tr'
                   });
                   view.$el.appendTo(tbody);
                   view.render();
               }, this);
           },
           'new': function (e) {
               e.preventDefault();
               App.novaTurma();
               App.router.navigate('turmas/nova');
           }
       });
       return CollectionView;
   });