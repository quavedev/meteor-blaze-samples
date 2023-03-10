import "./login.scss";
import "./login.html";
Template.Login.onCreated(function () {
  const tmpl = this;
  tmpl.form = new ReactiveVar({
    username: "user1@localhost",
    password: "user1",
  });
});
Template.Login.helpers({
  form() {
    return Template.instance().form.get();
  },
});

Template.Login.events({
  'submit  [data-action="login"]'(evt, tmpl) {
    evt.preventDefault();
    const { target } = evt;
    const username = target.username?.value;
    const password = target.password?.value;
    Meteor.loginWithPassword(username, password);
  },
  "click [data-value]"(evt, tmpl) {
    evt.preventDefault();
    const {
      target: {
        dataset: { value },
      },
    } = evt;
    tmpl.form.set({ username: `${value}@localhost`, password: value });
  },
  'click [data-action="logout"]'(evt) {
    evt.preventDefault();
    Meteor.logout();
  },
});
