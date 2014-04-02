if ( Menus.find().count() === 0 ) {
    Menus.insert({
        title: 'Primary Navigation'
    }); 
}

if (Settings.find().count() === 0 ){
	Settings.insert({
		headerLocation: 'top',
		siteTitle: 'Meteor CMS | Your Blank Canvas',
		landingPage: 'Home'
	})
}

if (Pages.find().count() === 0 ){
	Pages.insert({
		title: 'Home',
		slug: 'home',
		pageTemplate: 'default template',
		content: 'Welcome to MeteorCMS!'
	})
}

if (Meteor.users.find().count() === 1){
	var user = Meteor.users.findOne();
	console.log('Admin role added to userId: ' + user.username);
	Roles.addUsersToRoles(user, "Admin");
}