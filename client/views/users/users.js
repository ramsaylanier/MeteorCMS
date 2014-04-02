Template.users.events({
	'click .edit-user':function (e){
		e.preventDefault();
		$('.edit-user').parents('.table-row').find('.edit-user-content').slideToggle();
	},
	'click .add-role-btn': function(e){
		e.preventDefault();
		var roleName = $('.role-name-field').val();
		return Roles.createRole(roleName);
	},
	'click .delete-role': function(e){
		e.preventDefault();
		var roleName = $(e.target).attr('data-role-type');
		return Roles.deleteRole(roleName);
	},
	'click .assign-role-btn': function(e){
		var user = Meteor.users.findOne({_id: this._id});
		var role = $(e.target).next([name="assign-role-select"]).val();
		return Roles.addUsersToRoles(user, role);	
	}
})

Template.users.helpers({
	roles: function(){
		return Meteor.roles.find();
	}
})