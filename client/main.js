Meteor.subscribe('pages');
Meteor.subscribe('posts');
Meteor.subscribe('media');
Meteor.subscribe('categories');
Meteor.subscribe('settings');
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