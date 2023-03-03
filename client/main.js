import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import { ModalManager } from "../imports/ui/modal/modal";
import "./main.html";

Template.modalSample.onCreated(function helloOnCreated() {
  this.counter = new ReactiveVar(0);
  this.showModal = new ReactiveVar(false);
});

Template.modalSample.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  showModal() {
    return Template.instance().showModal.get();
  },
});

Template.modalSample.events({
  'click button[data-action="open-modal"]'(event, tmpl) {
    tmpl.counter.set(tmpl.counter.get() + 1);
    ModalManager.create({
      title: "Modal 1",
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
      title: "Modal 2",
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
