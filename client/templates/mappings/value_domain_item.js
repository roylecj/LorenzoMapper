Template.valueDomainItem.helpers({
});

Template.valueDomainItem.events({
  'click .domainItem': function (e, t) {

  Session.set("currentStatus", "Reading Domain Codes from LORENZO");

  Meteor.call('updateUserSession', Session.get('sessionId'));
    // Populate the list of codes for this domain

   Meteor.call("getCodesForDomain", Session.get('sessionId'), this._id);

   Router.go("codeList", {_id: this._id});
  }
});
