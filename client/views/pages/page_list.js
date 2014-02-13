Template.pagesList.helpers({
	pages: function(){
		return Pages.find();
	},
	prettyDate: function(submitted){
		return moment(new Date(submitted)).format('MMMM Do, YYYY');
	}
});

Template.pagesList.events({
	'click .delete-page' : function(e) {
		e.preventDefault();

		if (confirm("Delete This Page?")){
			var currentPageId = this._id;
			Pages.remove(currentPageId);
			Router.go('/admin/pages');
		}
	}
});