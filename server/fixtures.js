if ( Menus.find().count() === 0 ) {
    Menus.insert({
        title: 'Primary Navigation'
    }); 
}

if (Settings.find().count() === 0 ){
	Settings.insert({
		headerLocation: 'top',
		siteTitle: 'Meteor CMS | Your Blank Canvas'
	})
}