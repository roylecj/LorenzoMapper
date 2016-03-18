Template.letterItem.helpers({
  isCurrentLetter: function() {
    if (Session.get("startingLetter") === this.letter) {
      return "btn-danger"
    } else {
      return "btn-default"
    }
  }
});

Template.letterItem.events({
  'click .letter': function(e, t) {
    Session.set("startingLetter", this.letter);
  }
})
