var app = app || {};

// Our basic To Do model has 'title', 'order', and 'completed' attributes

app.Todo = Backbone.Model.extend({

	// Default values ensure that each todo created has 'title' and 'completed' keys.
	defaults: {
		title: '',
		completed: false
	},

	//Toggle the completed state of this Todo item
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}
});