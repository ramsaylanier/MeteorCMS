Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
});

//clears all Errors from the view before being routed
Router.before(function(){
	clearErrors(); 
});

Router.map(function(){
	this.route('viewPage', {
		path:'/', 
		controller: 'DefaultLayoutController',
		waitOn: function() { return Meteor.subscribe('settings')},
		data: function(){
			var landingPage = Settings.findOne().landingPage;
			return Pages.findOne({title: landingPage});
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

	this.route('media', {
		path:'/admin/media',
		controller: 'AdminLayoutController'
	});

	//************** PAGE ROUTES *******************

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

	this.route('categories', {
		path:'/admin/categories',
		controller: 'AdminLayoutController',
		waitOn: function() { return Meteor.subscribe('categories'); }
	});

	//************** POST ROUTES *******************

	this.route('postsList', {
		path:'/admin/posts',
		controller: 'AdminLayoutController',
		waitOn: function() { return Meteor.subscribe('posts'); }
	});

	this.route('newPost',{
		path:'/admin/new-post',
		controller: 'AdminLayoutController'
	});

	this.route('editPost',{
		path:'/admin/posts/:_id',
		controller: 'AdminLayoutController',
		data: 
			function() { return Posts.findOne(this.params._id); }
	});	

	this.route('viewPostSingle', {
		path:'posts/:slug',
		controller: 'DefaultLayoutController',
		data: function() { return Posts.findOne({slug: this.params.slug}); }
	});

	//************** CATEGORY ROUTES *******************
	this.route('categoryPosts', {
		path:'category/:slug',
		controller: 'DefaultLayoutController',
		data: function(){
			var slug = this.params.slug;
			var posts = Posts.find({categories: slug}).fetch();
			return{
				posts: posts
			}
		}
	});

	//************** SETTINGS ROUTES *******************

	this.route('settings', {
		path:'/admin/settings',
		controller: 'AdminLayoutController'
	});

	//************** SETTINGS ROUTES *******************

	this.route('users', {
		path:'/admin/users',
		controller: 'AdminLayoutController'
	})

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