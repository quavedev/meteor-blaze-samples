import "./layout.html";
import "./layout.scss";

const menus = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Login",
    link: "/auth/login",
  },
  {
    title: "Modal with reactive var",
    link: "/modal-rvar",
  },
  {
    title: "Modal with events",
    link: "/modal-events",
  },
  {
    title: "Publications",
    link: "/publications",
  },
];

Template.MainMenu.helpers({
  menus() {
    return menus;
  },
});

Template.FilesLinkShow.helpers({
  files() {
    return Object.entries(Template.instance()?.data?.files || {}).reduce(
      (acc, [side, files]) => [
        ...acc,
        ...files.map((file) => ({
          side,
          fileName: file,
          file: file.startsWith("http")
            ? file
            : `https://github.com/quavedev/meteor-blaze-samples/blob/main/${file}`,
        })),
      ],
      []
    );
  },
});
