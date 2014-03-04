Template.addCategory.events({
	'submit form':function(e){
		e.preventDefault();
		
		var category ={
			name: $(e.target).find('[name=category-name]').val(),
			slug: $(e.target).find('[name=category-slug]').val()
		}

		Meteor.call('category', category, function(error, id) {
			if (error){
				//call custom throwError function
				throwError(error.reason, 'error');
			} else {
				Router.go('/admin/categories', page);
			}
		});
	}

})