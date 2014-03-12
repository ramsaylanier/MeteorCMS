Template.newPost.events({
	'submit form': function(e){
		e.preventDefault();

		var categories = [];
		$('.category-choices input[type="checkbox"]:checked').each(function(){
              categories.push($(this).val());
        });


		var post ={
			title: $(e.target).find('[name=title]').val(),
			slug: Session.get('slug'),
			content: $(e.target).find('[name=editor]').val(),
			excerpt: $(e.target).find('[name=excerpt]').val(),
			featuredImage: $(e.target).find('[name=featured-image]').val(),
			categories: categories
		}

		Meteor.call('post', post, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason, 'error');
			} else {
				Router.go('/admin/posts', post);
			}
		});
	}
});

//reset Session variable that stores the slug for New Posts
Template.newPost.created = function(){
	var val = $('#title').val();
	Session.set('slug', encodeURI(val).toLowerCase());
}

Template.displayPostAdmin.rendered = function(){
	$('#editor').cleditor();
}

//live update the slug based on the title being typed in
Template.displayPostAdmin.events({
	'keyup #title':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'change #slug':function(e){
		Session.set('slug', encodeURI(e.target.value.replace(/\s+/g, '-').toLowerCase()));
	},
	'click .edit-slug': function(e){
		e.preventDefault();
		$('.editable-slug').toggleClass('hidden');
		$('#slug').toggleClass('hidden');
	},
	'click .add-media-btn': function(e){
		e.preventDefault();
		var frag = Meteor.render(Template.insertImage);
		$('body').append(frag);
	},
	'click #featured-image-btn':function(e){
		e.preventDefault();
		var frag = Meteor.render(Template.setFeaturedImage);
		$('body').append(frag);
	},
	'click #remove-image-btn':function(e){
		e.preventDefault();
		var currentPostId = this._id;
		Posts.update(currentPostId, {$set: {featuredImage: ""}});
	}
});

Template.displayPostAdmin.helpers({
	posts: function(){
		Posts.find();
	},
	value: function(){
		return Session.get('slug');
	},
	url: function(){
		return Meteor.absoluteUrl();
	},
	categories: function(){
		return Categories.find();
	},
	isChecked: function(name){
		if (name){
			for (var i=0; i<name.length; i++){
				if (this.name == name[i])
					return 'checked';
			}
		}
	}		
});

