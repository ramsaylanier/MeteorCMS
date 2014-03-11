Template.settings.events({
	'submit form': function(e){
		e.preventDefault();

		var currentSettingsId = "";

		if (Settings.findOne()){
			currentSettingsId = Settings.findOne()._id;
		}

		var settings = {
			siteTitle: $(e.target).find('[name=site-title]').val(),
			landingPage: $(e.target).find('[name=landing-page]').val(),
			headerLocation: $(e.target).find('[name=header-location]').val(),
			headerImage: $(e.target).find('[name=featured-image]').val(),
			headerHeight: $(e.target).find('[name=header-image-height]').val(),
			headerWidth: $(e.target).find('[name=header-image-width]').val()
		}

		Meteor.call('updateSettings', currentSettingsId, settings, function(error, id){
			if(error){
				throwError(error.reason, 'error');
			} else {
				throwError('Saved!', 'success');
			}
		});
	}
});

Template.settings.settings = function(){
	return Settings.findOne();
}

Template.settings.pages = function(){
	return Pages.find();
}

Template.settings.menus = {
	title: "Menus",
}

Template.settings.header = {
	title: "Header"
}

Template.settings.general = {
	title: "General",
	active: "toggle-active"
}

Template.settings.events({
	'click .settings-header':function(e){
		e.preventDefault();
		$(e.target).next('.settings-content').slideToggle();
		$(e.target).children('.toggle').toggleClass('toggle-active');
	}
});