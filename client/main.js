Meteor.subscribe('pages');
Meteor.subscribe('posts');
Meteor.subscribe('media');
Meteor.subscribe('categories');
Meteor.subscribe('usernames', function () { 
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