Template.newPage.events({
	'submit form': function(e){
		e.preventDefault();

		var page ={
			title: $(e.target).find('[name=title]').val(),
			slug: $(e.target).find('[name=slug]').val()
		}

		Meteor.call('page', page, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason);
			} else {
				Router.go('/admin/pages', page);
			}
		})
	},
	'keyup #title':function(e){
		Session.set('value', encodeURI(e.target.value));
	},
	'change #slug':function(e){
		Session.set('value', encodeURI(e.target.value));
	},
	'click .edit-slug': function(e){
		e.preventDefault();
		$('.editable-slug').toggleClass('hidden');
		$('#slug').toggleClass('hidden');
	}
});

Template.newPage.value = function(){
	return Session.get('value');
};

Template.newPage.url = function(){
	return Meteor.absoluteUrl()
}