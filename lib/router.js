Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('works'); }
});

Router.map(function(){
	this.route('workList', {path:'/'});
	this.route('workPage', {
		path:'/works/:_id',
		data: function() { return Works.findOne(this.params._id); }
	});
});