Template.addAssets.events({
  'change .fileUploader': function (e) {
    var files = e.target.files;
        Media.storeFiles(files);
  },
  'click .delete-file': function(e) {
    Media.remove(this._id);
  }
});

Template.addAssets.files = function() {
  //show all files that have been published to the client, with most recently uploaded first
  return Media.find();
};

Template.imageList.files = function(){
  return Media.find();
}

Template.imageList.events({
  'click .delete-file': function(e){
    Media.remove(this._id);
  }
});
