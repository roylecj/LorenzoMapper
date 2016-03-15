Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe("userDirectory"),
      Meteor.subscribe("valueDomains"),
      Meteor.subscribe("referenceValues"),
      Meteor.subscribe('userSession')
  ]}
});

Router.route('/', {name: 'login'});
Router.route('/mappings', {name: 'mappings'});
Router.route('/codes/:_id', {
  name: 'codeList',
  data: function() {
    return ValueDomains.findOne({_id: this.params._id});
  }});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    this.next();
  }
};

// Make sure that you are logged in before we start doing this...
Router.onBeforeAction(requireLogin, {except: ['login']});
