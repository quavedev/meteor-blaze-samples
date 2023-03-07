import "../home/home";

Router.route("/", function () {
  this.render("Home", {});
});

Router.route("/modal-rvar", function () {
  import "../modal/modal-rvar";
  this.render("ModalRvar", {});
});
Router.route("/modal-events", function () {
  import "../modal/modal-events";
  this.render("ModalEvents", {});
});
