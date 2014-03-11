Template.generalSettings.helpers({
	isSelected: function(title){
		var landingPage = Settings.findOne().landingPage;
		if (title == landingPage){
			return "selected='selected'";
		}
	}
});