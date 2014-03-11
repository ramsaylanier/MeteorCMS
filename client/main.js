Meteor.subscribe('pages');
Meteor.subscribe('posts');
Meteor.subscribe('media');
Meteor.subscribe('categories');
Meteor.subscribe('menus');
Meteor.subscribe('media');
Meteor.subscribe('usernames', function () { 
	//if there is a user and the username is "Admin", then disallow additional user creation
	var user = Meteor.users.find().fetch();
	if (user[0].username == 'admin'){
		Accounts.config({
			forbidClientAccountCreation: 'true'
		});
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Handlebars.registerHelper('setTitle', function(title){
	if (title){
		document.title = title;
	} else {
		document.title = "Meteor CMS | Your Blank Canvas"
	}
});

Handlebars.registerHelper('pages', function(){
	return Pages.find();
})

Deps.autorun(function(){
	Meteor.subscribe('settings');
})