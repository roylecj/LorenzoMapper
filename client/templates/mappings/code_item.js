Template.codeItem.onCreated(function() {
  Session.setDefault('editItem', '');
});
Template.codeItem.helpers({
  editItem: function(viewState) {
    if (viewState === "edit") {
      if (Session.get("editItem") === this._id) {
        return " "
      } else {
        return " hide "
      }
    } else {
      if (Session.get("editItem") === this._id) {
        return " hide "
      } else {
        return " "
      }
    }
  }
});

Template.codeItem.events({
  'click .btnEditItem': function(e) {
    Meteor.call('updateUserSession', Session.get('sessionId'));
    console.log("Editing item");
    var itemId = $(e.target.parentNode.parentNode).find('[name=referenceValueId]').text();

    console.log("itemId=" + itemId);

    if (itemId) {
      Session.set("editItem", itemId);
    }
  },
  'click .btnSaveEdit': function(e) {
    Meteor.call('updateUserSession', Session.get('sessionId'));
    console.log("Saving");

    var itemId = $(e.target.parentNode.parentNode.parentNode).find('[name=referenceValueId]').text();
    var mainCode = $(e.target.parentNode.parentNode.parentNode).find('[name=mainCode]').val();
    var description = $(e.target.parentNode.parentNode.parentNode).find('[name=description]').val();

    Meteor.call('updateReferenceValue', itemId, mainCode, description, function(e) {
      Session.set("editItem", "");

      console.log(e);
    });
  },
  'click .btnCancelEdit': function(e) {
    // Don't need to do anything special
    Meteor.call('updateUserSession', Session.get('sessionId'));
    Session.set("editItem", "");
  }
});
