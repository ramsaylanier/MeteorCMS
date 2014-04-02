Template.usersList.helpers({
	users: function(){
		return Meteor.users.find();
	},
	userEmail: function(user){
		return _.pluck(user.emails, "address");
	}
});