if (Meteor.users.find().count() === 0) {

  // This is the base environment when we first start out...
  // we need a login that we can use, and some roles, and that's about it
  // From there, the user can login, and setup the users that they need, and the mapping tables
  // and any tasks that they want to assign.

   var thisid;
   var userId = Accounts.createUser({
     username: 'admin',
     password: 'password',
     email: 'admin@csc.com',
     profile: { name: 'System Admin User'}
   });

   ValueDomains.insert({
     userId: userId,
     lorenzoOID: 'asdfasdfasdf',
     domainCode: 'SEXXX',
     description: 'Patient Sex'
   });
}
