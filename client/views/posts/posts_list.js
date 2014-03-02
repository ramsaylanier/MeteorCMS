Template.postsList.helpers({
	posts: function(){
		return Posts.find();
	},
	prettyDate: function(submitted){
		return moment(new Date(submitted)).format('MMMM Do, YYYY');
	}
});

Template.postsList.events({
	'click .delete-post' : function(e) {
		e.preventDefault();

		if (confirm("Delete This Post?")){
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('/admin/posts');
		}
	}
});