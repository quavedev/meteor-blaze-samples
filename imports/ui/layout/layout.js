import "./layout.html";
import "./layout.scss";

Template.MainMenu.onCreated(function onCreated() {
  this._menus = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Modal with reactive var",
      link: "/modal-rvar",
    },
    {
      title: "Modal with events",
      link: "/modal-events",
    },
  ];
});

Template.MainMenu.helpers({
  menus() {
    return Template.instance()._menus || [];
  },
});
