Template.newPage.events({
	'submit form': function(e){
		e.preventDefault();

		var page ={
			title: $(e.target).find('[name=title]').val(),
			slug: $(e.target).find('[name=slug]').val()
		}

		Meteor.call('page', page, function(error, id) {
			if (error)
				return alert(error.reason);
			
			Router.go('/admin/pages', page);
		})
	}
});