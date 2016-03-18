Template.mappings.onCreated(function() {
  // Check to see if this user has a set of domains recorded.

  Session.setDefault("sortOrder", "ASC");
  Session.setDefault("sortColumn", "DOMAIN");
  Session.setDefault("isFiltered", false);
  Session.setDefault("startingLetter", "A");
});

Template.mappings.helpers({
  showLetters: function() {
    if (Session.get("isFiltered")) {
      return "hide"
    } else {
      return ""
    };
  },
  letterList: function() {
    return LetterList.find().fetch();
  },
  valueDomain: function() {
    if (Session.get("sortOrder") === "ASC") {
      if (Session.get("sortColumn") === "DOMAIN") {
        return ValueDomains.find({startingCode: Session.get("startingLetter")}, {sort: {domainCode: 1}});
      } else {
        return ValueDomains.find({startingLetterDescription: Session.get("startingLetter")}, {sort: {domainDescription: 1}});
      }
    } else {
      if (Session.get("sortColumn") === "DOMAIN") {
        return ValueDomains.find({startingCode: Session.get("startingLetter")}, {sort: {domainCode: -1}});
      } else {
        return ValueDomains.find({startingLetterDescription: Session.get("startingLetter")}, {sort: {domainDescription: -1}});
      }
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
    Session.set('sortColumn', 'DOMAIN');
    if (Session.get('sortOrder') === "ASC") {
      Session.set('sortOrder', 'DESC');
    } else {
      Session.set('sortOrder', 'ASC');
    }
  },
  'click .descriptionColumn': function(e, t) {
    Session.set('sortColumn', 'DESCRIPTION');
    if (Session.get('sortOrder') === "ASC") {
      Session.set('sortOrder', 'DESC');
    } else {
      Session.set('sortOrder', 'ASC');
    }
  },
  'click .btnFilter': function(e, t) {
    Session.set("isFiltered", ! Session.get('isFiltered'));
  }
});
