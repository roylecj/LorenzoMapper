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

TemporaryData = new Mongo.Collection("temporaryData");

TemporaryData.allow({
  insert: function(userId, data) { return true; },
  remove: function(userId, data) { return true; },
  update: function(userId, data) { return true; }
});

LetterList = new Mongo.Collection("letters");

LetterList.allow({
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
  clearReferenceValues: function(sessionId) {
    ReferenceValues.remove({userId: sessionId});
  },
  createReferenceValue: function(domainId, oid, mainCode, description) {
    ReferenceValues.upsert({valueDomainId: domainId, termId: oid}, {$set:{
      valueDomainId: domainId,
      termId: oid,
      mainCode: mainCode,
      description: description}});
  },
  createDomain: function(oid, domainCode, domainDescription) {

    var startingLetterCode;
    var startingLetterDescription;
    var startPos;

    startingLetterCode = domainCode.substring(0,1);
    startingLetterDescription = domainDescription.substring(0,1);

    startPos = LetterList.find({letter: startingLetterCode}).count();

    if (startPos = 0) {
      startingLetterCode = "0-9"
    }

    startPos = LetterList.find({letter: startingLetterDescription}).count();

    if (startPos = 0) {
      startingLetterDescription = "0-9"
    }

    ValueDomains.upsert({lorenzoOID: oid}, {$set:{
      lorenzoOID: oid,
      domainCode: domainCode,
      description: domainDescription,
      startingCode: startingLetterCode,
      startingLetterDescription: startingLetterDescription}});
  },
  loadValueDomains: function(userId) {

    // Get it from the database...

    console.log("loadValueDomains-START");

    var url = "";

//    url = "http://localhost:1025/?GETDOMAINS";
    url = "http://localhost:1025/?GETDOMAINS";

    Meteor.call('callViaduct', url, function(e, r) {
      if (e) {
        throw new Meteor.Error("error-connecting-to-runtime", "Unable to connect to LORENZO");
      } else {
        console.log("About to call loadDomains");
//        console.dir(r);
//        loadDomains(r, userId);

console.log('userId= ' + userId);
        TemporaryData.upsert({userId: userId}, {$set:{userId: userId,
        xmlData: r}});

        // return r
      }
    });

  },
  getCodesForDomain: function(userId, id) {

//    ReferenceValues.remove({userId: userId});

    var url = "";

    url = "http://localhost:1025/?GETCODES" + id;

    Meteor.call('callViaduct', url, function(e, r) {
      if (e) {
        throw new Meteor.Error("error-connecting-to-runtime", "Unable to connect to LORENZO");
      } else {
        TemporaryData.upsert({userId: userId},
          {$set:{userId: userId,
                xmlData: r}});
      }
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
