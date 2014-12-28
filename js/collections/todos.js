var app = app || {};

// The collection of Todo is backed by localStorage instead of a remote server

var todoList = Backbone.Collection.extend({

	// Reference to this collection's model
	model: app.Todo,

	// the following line depends on localStorage.js
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	defaults: function() {
	    return {
	      title: "empty todo...",
	      order: Todos.nextOrder(),
	      completed: false
	    };
	},
	// Filter out the list of all todo items that are finished.
	completed: function() {
		return this.filter(function( todo ) {
			return todo.get('completed');
		});
	},

	// Filter down the list to only todo items that are still not finished
	remaining: function() {

		// apply allowus to define the context of this within our function scope
		return this.without.apply( this, this.completed() );
	},

	// We keep the todos in sequential order, despite being saved unordered
	// GUID in the database. This generates the next order number for new items.
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	//Todos are sorted by their original order.
	comparator: function( todo ) {
		return todo.get('order');
	}
});

app.Todos = new todoList();