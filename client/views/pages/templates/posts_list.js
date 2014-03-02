Template.posts_list_template.helpers({
	posts: function(){
		return Posts.find();
	}
});