Meteor.publish("userDirectory", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1}});
});

Meteor.publish("valueDomains", function() {
  return ValueDomains.find({});
});

Meteor.publish('referenceValues', function () {
  return ReferenceValues.find({});
});

Meteor.publish("userSession", function() {
  return UserSession.find({});
})
