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

   LetterList.insert({letter: 'A'});
   LetterList.insert({letter: 'B'});
   LetterList.insert({letter: 'C'});
   LetterList.insert({letter: 'D'});
   LetterList.insert({letter: 'E'});
   LetterList.insert({letter: 'F'});
   LetterList.insert({letter: 'G'});
   LetterList.insert({letter: 'H'});
   LetterList.insert({letter: 'I'});
   LetterList.insert({letter: 'J'});
   LetterList.insert({letter: 'K'});
   LetterList.insert({letter: 'L'});
   LetterList.insert({letter: 'M'});
   LetterList.insert({letter: 'N'});
   LetterList.insert({letter: 'O'});
   LetterList.insert({letter: 'P'});
   LetterList.insert({letter: 'Q'});
   LetterList.insert({letter: 'R'});
   LetterList.insert({letter: 'S'});
   LetterList.insert({letter: 'T'});
   LetterList.insert({letter: 'U'});
   LetterList.insert({letter: 'V'});
   LetterList.insert({letter: 'W'});
   LetterList.insert({letter: 'X'});
   LetterList.insert({letter: 'Y'});
   LetterList.insert({letter: 'Z'});
   LetterList.insert({letter: '0-9'});
}
