import "../home/home";

Router.route("/", function () {
  this.render("Home", {});
});

Router.route("/modal-rvar", function () {
  import "../modal/modal-rvar";
  this.render("ModalRvar", {});
  this.render("FilesLinkShow", {
    to: "filesLink",
    data: function () {
      return {
        files: {
          README: ["docs/modal.md"],
          "Live Demo": [
            "https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/modal-rvar",
          ],
          "Modal impl. (client)": [
            "imports/ui/modal/modal.html",
            "imports/ui/modal/modal.js",
          ],
          "Usage  (client)": [
            "imports/ui/modal/modal-rvar.html",
            "imports/ui/modal/modal-rvar.js",
          ],
        },
      };
    },
  });
});
Router.route("/modal-events", function () {
  import "../modal/modal-events";
  this.render("ModalEvents", {});
  this.render("FilesLinkShow", {
    to: "filesLink",
    data: function () {
      return {
        files: {
          README: ["docs/modal.md"],
          "Live Demo": [
            "https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/modal-events",
          ],
          "Modal impl. (client)": [
            "imports/ui/modal/modal.html",
            "imports/ui/modal/modal.js",
          ],
          "Usage  (client)": [
            "imports/ui/modal/modal-events.html",
            "imports/ui/modal/modal-events.js",
          ],
        },
      };
    },
  });
});

Router.route("/auth/login", function () {
  import "../auth/login";
  this.render("Login", {});
  this.render("FilesLinkShow", {
    to: "filesLink",
    data: function () {
      return {
        files: {
          README: ["docs/auth.md"],
          "Live Demo": [
            "https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/auth/login",
          ],
          "Login/logout (Client)": [
            "imports/ui/auth/login.html",
            "imports/ui/auth/login.js",
            "imports/ui/auth/login.scss",
          ],
          "Initial user data (Server)": [
            "imports/server/startup/init-sample-data.js",
          ],
        },
      };
    },
  });
});

Router.route("/publications", function () {
  import "../publications/publications";
  this.render("Publications");
  this.render("FilesLinkShow", {
    to: "filesLink",
    data: function () {
      return {
        files: {
          README: ["docs/publications.md"],
          "Live Demo": [
            "https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/publications",
          ],
          Client: [
            "imports/ui/publications/publications.html",
            "imports/ui/publications/publications.js",
            "imports/ui/publications/publications.scss",
          ],
          Server: ["imports/server/publications/countries-publication.js"],
        },
      };
    },
  });
});
