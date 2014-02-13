Template.newPage.events({
	'submit form': function(e){
		e.preventDefault();

		var page ={
			title: $(e.target).find('[name=title]').val(),
			slug: $(e.target).find('[name=slug]').val(),
			displayTitle: $(e.target).find('[name=hide-title]').val()
		}

		Meteor.call('page', page, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason);
			} else {
				Router.go('/admin/pages', page);
			}
		})
	}
});

//reset Session variable that stores the slug for New Pages
Template.newPage.created = function(){
	var val = $('#title').val();
	Session.set('value', '');
}

//live update the slug based on the title being typed in
Template.displayPageAdmin.events({
	'keyup #title':function(e){
		Session.set('value', encodeURI(e.target.value).toLowerCase());
	},
	'change #slug':function(e){
		Session.set('value', encodeURI(e.target.value).toLowerCase());
	},
	'click .edit-slug': function(e){
		e.preventDefault();
		$('.editable-slug').toggleClass('hidden');
		$('#slug').toggleClass('hidden');
	}
});

Template.displayPageAdmin.value = function(){
	return Session.get('value');
}

Template.displayPageAdmin.url = function(){
	return Meteor.absoluteUrl()
}