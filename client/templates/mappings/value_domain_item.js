
loadCodesIntoCollection = function (sessionId, domainId) {
  parser = new DOMParser();

  resultDoc = TemporaryData.findOne({userId: sessionId});
  xmlResult = resultDoc.xmlData;

  Meteor.call("clearReferenceValues", sessionId);
  
  xmlDoc=parser.parseFromString(xmlResult,"application/xml");

  var procList = "";
  // debugger
  var processItems = xmlDoc.getElementsByTagName ("codeItem");
  for (i = 0; i < processItems.length; i++) {

    var oid = processItems[i].getAttribute("oid");
    var mainCode = processItems[i].getAttribute("mainCode");
    var description = processItems[i].getAttribute("description");

    ReferenceValues.insert({
      userId: sessionId,
      valueDomainId: domainId,
      termId: oid,
      mainCode: mainCode,
      description: description
    });
    //  Meteor.call('createReferenceValue', domainId, oid, mainCode, description);

  }

};

Template.valueDomainItem.helpers({
});

Template.valueDomainItem.events({
  'click .domainItem': function (e, t) {
      // Session.set("currentStatus", "Reading Domain Codes from LORENZO");
      var thisid = this._id;
      var domainid = this.lorenzoOID;

      Meteor.call("getCodesForDomain", Session.get("sessionId"), this.lorenzoOID, function (e, r) {
        loadCodesIntoCollection(Session.get("sessionId"), domainid);
        Router.go("codeList", {_id: thisid});
      });
  }
});
