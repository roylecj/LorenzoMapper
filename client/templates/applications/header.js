
Template.header.helpers({
  currentUserName: function() {
    return Meteor.user().profile.name;
  },
  currentStatus: function() {
    return Session.get('currentStatus');
  }
});

Template.header.events({
  'click .btnLogout': function(e) {

    Meteor.logout();

    Session.set("signedIn", false);
    Router.go("login");
  }
})
