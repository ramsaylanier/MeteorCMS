isAdmin = function(userId, doc){
	return Roles.userIsInRole(this.userId, "Admin");
}