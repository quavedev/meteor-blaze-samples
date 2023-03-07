import "./modal.html";
import { Template } from "meteor/templating";

Template.modal.onCreated(function () {
  const tmpl = this;
  const { data } = this;
  console.info("Creating modal with data: ", { data });
  this._events = {
    confirm: () => {
      const { data } = tmpl;
      const { onConfirm } = data || {};
      // When confirm button clicked, call onConfirm event.
      if (onConfirm) onConfirm({ action: "confirm", data });
      // Remove current modal instance
      Blaze.remove(tmpl.view);
    },
    cancel: () => {
      const { data } = tmpl;
      const { onCancel } = data || {};
      // When cancel button clicked, call onCancel event.
      if (onCancel) onCancel({ action: "cancel", data });
      // Remove current modal instance
      Blaze.remove(tmpl.view);
    },
  };
  this._bindEvent = (eventName, callback) => {
    const oldEvent = this._events[eventName];
    this._events[eventName] = () => {
      callback();
      oldEvent();
    };
  };
});

Template.modal.helpers({
  title() {
    // Receive title from data params.
    return Template.instance()?.data?.title || "Modal title";
  },
  contentTemplateName() {
    // Receive template name from data params.
    return Template.instance()?.data?.contentTemplateName || "empty-content";
  },
  contentData() {
    const tmpl = Template.instance();
    // Receive content data from data params.
    const { contentData } = tmpl.data;
    return {
      ...contentData,
      bindConfirmEvent: (callback) => tmpl._bindEvent("confirm", callback),
      bindCancelEvent: (callback) => tmpl._bindEvent("cancel", callback),
    };
  },
});

Template.modal.events({
  'click button[data-action="confirm"]'(evt, tmpl) {
    tmpl._events.confirm();
  },
  'click button[data-action="cancel"]'(evt, tmpl) {
    tmpl._events.cancel();
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
    // Render modal with params
    Blaze.renderWithData(
      Template.modal,
      { title, contentData, contentTemplateName, onCancel, onConfirm, ...rest },
      document.body
    );
  },
};
