Template.viewPostExcerpt.helpers({
	prettyDate: function(submitted){
		return moment(new Date(submitted)).format('MMMM Do, YYYY');
	}
});