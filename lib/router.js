Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

//clears all Errors from the view before being routed
Router.before(function(){
	clearErrors(); 
});

Router.map(function(){
	this.route('workList', {
		path:'/', 
		controller: 'DefaultLayoutController',
		data:{
			containerTitle: 'home'
		}
	});

	this.route('login', {
		path: '/login',
		before: function(){
			if (Meteor.user()) {
        		this.redirect('/admin');
        	}
		},
	});

	this.route('admin', {
		path:'/admin', 
		controller: 'AdminLayoutController'
	});

	this.route('pagesList', {
		path:'/admin/pages',
		controller: 'AdminLayoutController',
		waitOn: function() { return Meteor.subscribe('pages'); }
	});

	this.route('newPage',{
		path:'/admin/new-page',
		controller: 'AdminLayoutController'
	});

	this.route('editPage',{
		path:'/admin/pages/:_id',
		controller: 'AdminLayoutController',
		data: 
			function() { return Pages.findOne(this.params._id); }
		});

	this.route('viewPage', {
		path:'/:slug',
		controller: 'DefaultLayoutController',
		data: function() { return Pages.findOne({slug: this.params.slug}); },
	});

//DEFINE LAYOUT CONTROLLERS HERE
	DefaultLayoutController = RouteController.extend({
		yieldTemplates: {
			'header': {to: 'header'}
		} 
	});

	AdminLayoutController = RouteController.extend({
		yieldTemplates: {
			'adminHeader': {to: 'header'},
			'adminSidebar': {to: 'sidebar'}
		},
		data:{
			containerTitle: 'admin'
		},
		before: function(){
			if (!Meteor.user()) {
        		this.redirect('/login');
		
		        // stop the rest of the before hooks and the action function 
		        this.stop();
      		}
		}
	});
});