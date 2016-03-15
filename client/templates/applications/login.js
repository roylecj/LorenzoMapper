Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.login.onCreated(function() {
    Session.set('signedIn', false);
});

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    // Check to see if this user is active or not...

    var usrId;
    var userDetails;

    userDetails = Meteor.users.findOne({username: userId});

    usrId = userDetails._id;

    Meteor.loginWithPassword(userId, password, function(e) {
        console.log("logging in with " + userId + "....");

        console.log(e);

        Meteor.call('createUserSession', userId, function(eInternal, r) {
            Session.set("sessionId", r);
        });

        if (!e) {
          Session.set('signedIn', true);
          Router.go('mappings');
        } else {
          sAlert.error('Error logging in: ' + e.reason);
        }
    });
  }
})
