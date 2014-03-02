Template.editPost.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPostId = this._id;

		var postAttributes = {
			title: $(e.target).find('[name=title]').val(),
			slug: $(e.target).find('[name=slug]').val(),
			content: $(e.target).find('[name=editor]').val(),
			excerpt: $(e.target).find('[name=excerpt]').val()
		}

		Meteor.call('updatePost', currentPostId, postAttributes, function(error, id) {
			if(error){
				throwError(error.reason, 'error');
			} else {
				throwError('Published!', 'success');
			}
		});
	},

	'click #delete-post-btn' : function(e) {
		e.preventDefault();

		if (confirm("Delete This Post?")){
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('/admin/posts');
		}
	}
});

//reset Session variable to the current post title when editing posts
Template.editPost.rendered = function(){
	//only run this code on the first rendering, not on a re-render
	var val = $('#slug').val();
	Session.set('slug', val.toLowerCase());
}
