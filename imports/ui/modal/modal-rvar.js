import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { ModalManager } from "./modal";
import "./modal-rvar.html";

Template.ModalRvar.onCreated(function () {
  this.counter = new ReactiveVar(0);
  this.showModal = new ReactiveVar(false);
});

Template.ModalRvar.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  showModal() {
    return Template.instance().showModal.get();
  },
});

Template.ModalRvar.events({
  'click button[data-action="open-modal"]'(event, tmpl) {
    tmpl.counter.set(tmpl.counter.get() + 1);
    ModalManager.create({
      title: "Modal with Reactive var",
      contentTemplateName: "modalContent1",
      contentData: { counter: tmpl.counter },
    });
  },
});

Template.modalContent1.helpers({
  counter() {
    return Template.instance().data.counter.get();
  },
});
Template.modalContent2.helpers({
  counter() {
    return Template.instance().data.counter.get();
  },
});

Template.modalContent1.events({
  'click button[data-action="modal-2"]'(evt, tmpl) {
    ModalManager.create({
      title: "Modal over another modal",
      contentTemplateName: "modalContent2",
      onConfirm: (data) => {
        console.log({ data });
      },
      contentData: { counter: tmpl.data.counter },
    });
  },
  'click button[data-action="increment"]'(evt, tmpl) {
    tmpl.data.counter.set(tmpl.data.counter.get() + 1);
  },
});
Template.modalContent2.events({
  'click button[data-action="increment"]'(evt, tmpl) {
    tmpl.data.counter.set(tmpl.data.counter.get() + 1);
  },
});
