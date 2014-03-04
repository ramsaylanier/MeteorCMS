Template.listCategories.helpers({
	categories: function(){
		return Categories.find();
	},
	postCount: function(name){
		var posts = Posts.find({categories: name});
		return posts.count();
	}
});

Template.listCategories.events({
	'click .delete-category': function(e){
		e.preventDefault();
		var category = this.name;
		Categories.remove(this._id);

		var posts = Posts.find({categories: this.name}).fetch();
		for (var i=0;i<posts.length;i++){
			var cats = _.without(posts[i].categories, this.name);
			Posts.update(posts[i]._id, {$set: {categories: cats}});
		}		
	}
})