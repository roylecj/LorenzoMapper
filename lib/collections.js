ValueDomains = new Mongo.Collection("valueDomains");

ValueDomains.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

ReferenceValues = new Mongo.Collection("referenceValues");

ReferenceValues.allow({
  insert: function(userId, data) { return true; },
  remove: function(userId, data) { return true; },
  update: function(userId, data) { return true; }
});

UserSession = new Mongo.Collection("userSession");
UserSession.allow({
  insert: function(userId, data) { return true; },
  remove: function(userId, data) { return true; },
  update: function(userId, data) { return true; }
});

Meteor.methods({
  createUserSession: function(userId) {

    var newDate;

    newDate = moment().add(5, 'm').toDate();

    return UserSession.insert({
      userId: userId,
      loggedIn: Date.now(),
      lastUpdate: Date.now(),
      expiry: newDate
    });
  },
  updateUserSession: function(sessionId) {
    var newDate;

    newDate = moment().add(5, 'm').toDate();

    return UserSession.update({_id: sessionId}, {$set: {
      lastUpdate: Date.now(),
      expiry: newDate
    }});
  },
  isSessionActive: function(sessionId) {
    var ses = UserSession.findOne({_id: sessionId});
    var currentDate = moment().toDate();

    // Remove any invalid sessions.

    UserSession.remove({ expiry: { $lt: currentDate } });

    if (moment().isBefore(ses.expiry)) {
      // Session Active
      return true
    } else {
      // Session Expired
      return false
    }
  },
  clearValueDomainCache: function(userId) {
    ValueDomains.remove({userId: userId});
  },
  loadValueDomains: function(userId) {

    // Get it from the database...

    var url = "";

    url = "http://10.1.1.66:3001/GETDOMAINS";

    Meteor.call('callViaduct', url, function(e, r) {
      Meteor.call('loadDomains', r, userId);
    });
  },
  loadDomains:function(result, sessionId){
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(result,"text/xml");

    var procList = "";
    var processItems = xmlDoc.getElementsByTagName ("domainItem");
    for (i = 0; i < processItems.length; i++) {

      var oid = processItems[i].getAttribute("oid");
      var domainCode = processItems[i].getAttribute("domainCode");
      var domainDescription = processItems[i].getAttribute("domainDescription");

      ValueDomains.insert({
        userId: sessionId,
        lorenzoOID: oid,
        domainCode: domainCode,
        description: domainDescription}
      );
    }
  },
  getCodesForDomain: function(userId, id) {

    console.log("clearing them out");

    // Clear them out first...

    // ReferenceValues.remove({userId: userId, valueDomainId: id});
    ReferenceValues.remove({userId: userId});

    console.log("creating ref. val");

    ReferenceValues.insert({
      userId: userId,
      valueDomainId: id,
      lorenzoOID: 'asdfasdfa',
      mainCode: 'M',
      description: 'Male'
    });

    ReferenceValues.insert({
      userId: userId,
      valueDomainId: id,
      lorenzoOID: 'asdfasdfa',
      mainCode: 'F',
      description: 'Female'
    });
  },
  updateReferenceValue(id, mainCode, description ) {
    // Updating in the database.

    ReferenceValues.update({_id: id}, {$set: {
      mainCode: mainCode,
      description: description
    }});
  }
});
