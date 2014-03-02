Template.addMedia.events({
  'change .fileUploader': function (e) {
    var files = e.target.files;
    Media.storeFiles(files);
  },
  'click #add-media-btn': function(e) {
    e.preventDefault();
    $('.fileUploader').click();
  },
  'click .delete-file': function(e) {
    Media.remove(this._id);
  }
});

Template.addMedia.files = function() {
  //show all files that have been published to the client, with most recently uploaded first
  var files = $('.fileUploader').files;
  return Media.find(files);
};

Template.imageList.files = function(){
  return Media.find({}, { sort: { uploadDate:-1 } });
}

Template.imageList.events({
  'click .delete-file': function(e){
    Media.remove(this._id);
  }
});
