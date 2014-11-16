var app = app || {};

// The DOM element for a Todo Item
app.TodoView = Backbone.View.extend({

	// a list tag
	tagName: 'li',

	//Cache the template function for a single item
	template: _.template( $('#item-template').html() ),

	//The DOM events specific to an item.
	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// The TodoView listens to its model, rerendering. 
	initialize: function() {
		this.listenTo( this.model, 'change', this.render );		
	},

	// Rerenders the titles of the todo item.
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$input = this.$('.edit');
		return this;
	},

	// Switch this view into editing mode, displaying the input field.
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// CLose the 'editing' mode and saving changes to the todo.
	close: function() {
		var value = this.$input.val().trim();

		if (value) {
			this.model.save( { title: value } );
		}

		this.$el.removeClass('editing');
	},

	// If you hit enter, we are through editing the item.
	updateOnEnter: function ( e ) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	}
});