
Template.mappings.onCreated(function() {
  // Check to see if this user has a set of domains recorded.

  Session.setDefault("sortOrder", "ASC");
  Session.setDefault("sortColumn", "DOMAIN");
  Session.setDefault("isFiltered", false);

  Meteor.call('updateUserSession', Session.get('sessionId'));

  /// 1. Clear out value domains

  Session.set("currentStatus", "Clearing Cached Values");
  Meteor.call("clearValueDomainCache", Session.get('sessionId'), function(e) {
    Session.set("currentStatus", "Loading Domains");
    Meteor.call("loadValueDomains", Session.get('sessionId'));

    Session.set("currentStatus", "");
  });
});

Template.mappings.helpers({
  valueDomain: function() {

    if (Session.get("sortOrder") === "ASC") {
        return ValueDomains.find({userId: Session.get('sessionId')}, {sort: {domainCode: 1}})
    } else {
        return ValueDomains.find({userId: Session.get('sessionId')}, {sort: {domainCode: -1}})
    }
  },
  isFiltered: function() {
    return Session.get('isFiltered');
  },
  sortOrder: function() {
    if (Session.get("sortOrder") === "ASC") {
      return "glyphicon-arrow-up"
    } else {
      return "glyphicon-arrow-down"
    }
  },
  sortColumn: function(columnCode) {
    if (Session.get("sortColumn") === columnCode) {
        return true
      } else {
        return false
      }
  },
  filterState: function() {
    if (Session.get('isFiltered') === true) {
      return "btn-success"

    } else {
      return "btn-default"
    }
  }
});

Template.mappings.events({
  'click .domainCodeColumn': function(e, t) {
    Meteor.call('updateUserSession', Session.get('sessionId'));
    Session.set('sortColumn', 'DOMAIN');
    if (Session.get('sortOrder') === "ASC") {
      Session.set('sortOrder', 'DESC');
    } else {
      Session.set('sortOrder', 'ASC');
    }
  },
  'click .descriptionColumn': function(e, t) {
    Meteor.call('updateUserSession', Session.get('sessionId'));
    Session.set('sortColumn', 'DESCRIPTION');
    if (Session.get('sortOrder') === "ASC") {
      Session.set('sortOrder', 'DESC');
    } else {
      Session.set('sortOrder', 'ASC');
    }
  },
  'click .btnFilter': function(e, t) {
    Meteor.call('updateUserSession', Session.get('sessionId'));
    Session.set("isFiltered", ! Session.get('isFiltered'));
  }
});
