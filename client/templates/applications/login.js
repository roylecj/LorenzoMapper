
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.login.onCreated(function() {
    Session.set('signedIn', false);
});


loadDomainsIntoCollection = function (sessionId) {
  parser = new DOMParser();

  resultDoc = TemporaryData.findOne({userId: sessionId});
  xmlResult = resultDoc.xmlData;

  xmlDoc=parser.parseFromString(xmlResult,"application/xml");

  var procList = "";
  // debugger


  var processItems = xmlDoc.getElementsByTagName ("domainItem");

  console.log("processItems.length="+ processItems.length);
  for (i = 0; i < processItems.length; i++) {

    var oid = processItems[i].getAttribute("oid");
    var domainCode = processItems[i].getAttribute("domainCode");
    var domainDescription = processItems[i].getAttribute("domainDescription");

// console.log(startingLetterCode);

    if (ValueDomains.find({
        lorenzoOID: oid,
        domainCode: domainCode,
        description: domainDescription}).count() === 0) {

//          console.log("loading domain " + domainCode);

            Meteor.call('createDomain', oid, domainCode, description);
        }
  }

};

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

            Session.set('signedIn', true);

            Meteor.call("loadValueDomains", Session.get('sessionId'), function (e, r) {
              loadDomainsIntoCollection(Session.get("sessionId"));
            });
        });

        if (!e) {
          Router.go('mappings');
        } else {
          sAlert.error('Error logging in: ' + e.reason);
        }

    });
  }
})
