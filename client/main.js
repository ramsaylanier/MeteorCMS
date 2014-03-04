var user = Meteor.users.findOne();
if (user){
	Accounts.config({
		forbidClientAccountCreation: 'true'
	});
}

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('pages');
Meteor.subscribe('posts');
Meteor.subscribe('media');
Meteor.subscribe('categories');