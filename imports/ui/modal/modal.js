import "./modal.html";
import { Template } from "meteor/templating";

Template.modal.onCreated(function () {
  const { data } = this;
  console.info("Creating modal with data: ", { data });
});

Template.modal.helpers({
  title() {
    return Template.instance()?.data?.title || "Modal title";
  },
  contentTemplateName() {
    return Template.instance()?.data?.contentTemplateName || "empty-content";
  },
  contentData() {
    return Template.instance()?.data?.contentData;
  },
});

Template.modal.events({
  'click button[data-action="confirm"]'(evt, tmpl) {
    const { data } = tmpl;
    const { onConfirm } = data || {};
    if (onConfirm) onConfirm({ action: "confirm", data });
    Blaze.remove(tmpl.view);
  },
  'click button[data-action="cancel"]'(evt, tmpl) {
    const { data } = tmpl;
    const { onCancel } = data || {};
    if (onCancel) onCancel({ action: "cancel", data });
    Blaze.remove(tmpl.view);
  },
});

export const ModalManager = {
  create({
    title,
    contentTemplateName,
    contentData,
    onCancel,
    onConfirm,
    ...rest
  }) {
    Blaze.renderWithData(
      Template.modal,
      { title, contentData, contentTemplateName, onCancel, onConfirm, ...rest },
      document.body
    );
  },
};
