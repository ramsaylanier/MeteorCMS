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

		//remove category from all Posts that have it assigned
		var posts = Posts.find({categories: this.name}).fetch();
		for (var i=0;i<posts.length;i++){
			var cats = _.without(posts[i].categories, this.name);
			Posts.update(posts[i]._id, {$set: {categories: cats}});
		}		
	},
	'click .edit-category': function(e){
		e.preventDefault();
		$(e.target).parents('.column-name').parent().next('.edit-category-row').slideToggle();
	},
	'submit .update-category-form': function(e){
		e.preventDefault();

		var category = Categories.findOne({_id:this._id});

		var updatedCategory ={
			name: $(e.target).find('[name=category-name]').val(),
			slug: $(e.target).find('[name=category-slug]').val()
		}

		Meteor.call('updateCategory', category._id, updatedCategory, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason, 'error');
			} else {
				throwError('Category Updated!', 'success');
			}
		});
	}
})