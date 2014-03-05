Template.viewPostExcerpt.helpers({
	prettyDate: function(submitted){
		return moment(new Date(submitted)).format('MMMM Do, YYYY');
	}
});

Template.viewPostSingle.helpers({
	prettyDate: function(submitted){
		return moment(new Date(submitted)).format('MMMM Do, YYYY');
	}
});