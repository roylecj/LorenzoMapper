Template.codeList.onCreated(function() {
  Session.setDefault('codesSortColumn', 'mainCode');
  Session.setDefault('codesSortOrder', '1');
  Session.setDefault('codesFiltered', false);
  Session.setDefault('mainCodeSearch', "");
  Session.setDefault('descriptionSearch', '');
});

Template.codeList.helpers({
  currentFilterMainCode: function() {
    return Session.get('mainCodeSearch');
  },
  currentFilterDescription: function() {
    return Session.get('descriptionSearch');
  },
  codeItems: function() {

    console.log("codeItems for domain-" + this.lorenzoOID);

    // return ReferenceValues.find({userId: Session.get("sessionId"), valueDomainId: this.lorenzoOID});

    var sortOrder;
    var sortQueryString = {};

    sortOrder = Session.get("codesSortOrder");
    sortColumn = Session.get("codesSortColumn");

    var sortQuery;
    sortQueryString = "{\"" + sortColumn + "\":" + sortOrder + "}"
    var sortQuery = JSON.parse(sortQueryString);
    var mainCodeSearch = Session.get("mainCodeSearch");
    var descriptionSearch = Session.get("descriptionSearch");

    if (mainCodeSearch) {
      if (descriptionSearch) {
        return ReferenceValues.find({
          userId: Session.get('sessionId'),
          valueDomainId: this.lorenzoOID,
          mainCode: {$regex: mainCodeSearch, $options: 'i'},
          description: {$regex: descriptionSearch, $options: 'i'}},
        {sort: {sortQuery}});
      } else {
        return ReferenceValues.find({
          userId: Session.get('sessionId'),
          valueDomainId: this.lorenzoOID,
          mainCode: {$regex: mainCodeSearch, $options: 'i'}},
        {sort: sortQuery} );
      }
    } else {
      if (descriptionSearch) {
        return ReferenceValues.find({userId: Session.get('sessionId'),
          valueDomainId: this.lorenzoOID,
          description: {$regex: descriptionSearch, $options: 'i'}},
        {sort: {sortQuery}});
      } else {
        return ReferenceValues.find({userId: Session.get('sessionId'),
          valueDomainId: this.lorenzoOID},{sort: {sortQuery}});
      }
    }
  },
  sortColumn: function(columnCode) {
    if (Session.get("codesSortColumn") === columnCode) {
        return true
      } else {
        return false
      }
  },
  sortOrder: function() {
    if (Session.get("codesSortOrder") === "1") {
      return "glyphicon-arrow-up"
    } else {
      return "glyphicon-arrow-down"
    }
  },
  isFiltered: function() {
    return Session.get('codesFiltered');
  },
  filterState: function() {
    if (Session.get('codesFiltered') === true) {
      return "btn-success"
    } else {
      return "btn-default"
    }
  }
});

Template.codeList.events({
  'click .btnFilter': function(e, t) {
    Session.set('codesFiltered', ! Session.get('codesFiltered'));
  },
  'click .referenceCodeColumn': function(e, t) {
    Session.set('codesSortColumn', 'mainCode');
    if (Session.get('codesSortOrder') === "1") {
      Session.set('codesSortOrder', '-1');
    } else {
      Session.set('codesSortOrder', '1');
    }
  },
  'click .descriptionColumn': function(e, t) {
    Session.set('codesSortColumn', 'description');
    if (Session.get('codesSortOrder') === "1") {
      Session.set('codesSortOrder', '-1');
    } else {
      Session.set('codesSortOrder', '1');
    }
  },
  'keyup .filterMainCode': function(e) {
    // We need to set the search string...
    var searchString = "";

    searchString = e.target.value;

    console.log("mainCodeSearch=" + searchString);

    Session.set("mainCodeSearch", searchString);
  },
  'keyup .filterDescription': function(e) {
    // We need to set the search string...
    var searchString = "";

    searchString = e.target.value;

    console.log("descriptionSearch=" + searchString);

    Session.set("descriptionSearch", searchString);
  }

});
