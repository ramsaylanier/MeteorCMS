Accounts.config({
	forbidClientAccountCreation: 'true'
});

Meteor.subscribe('pages');
Meteor.subscribe('posts');
Meteor.subscribe('media');
Meteor.subscribe('categories');