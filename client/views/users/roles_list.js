Template.rolesList.helpers({
	roles: function(){
		return Meteor.roles.find();
	}
});