define(['app/instrutor/itemView'],
   function (ItemView) {
        var CollectionView = Marionette.CompositeView.extend({
            template: '#instrutoresTp',
            events: {
                'click [data-action=new]': 'new'
            },
            ui: {
                tbody: 'tbody'
            },
            itemView: ItemView,
            appendHtml: function (collectionView, itemView, index) {
                collectionView.ui.tbody.append(itemView.el);
            },
            'new': function (e) {
                e.preventDefault();
                App.novoInstrutor();
                App.router.navigate('instrutores/novo');
            }
        });
        return CollectionView;
    });