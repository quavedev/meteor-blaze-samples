import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { ModalManager } from "./modal";
import "../forms/basic-info/basic-info";
import "./modal-events.html";

Template.ModalEvents.onCreated(function () {
  this.basicInfo = new ReactiveVar({
    firstName: "",
    lastName: "",
    email: "",
  });
  this.showModal = new ReactiveVar(false);
});

Template.ModalEvents.helpers({
  basicInfo() {
    return Template.instance().basicInfo.get();
  },
  showModal() {
    return Template.instance().showModal.get();
  },
});

Template.BasicInfoForm.onRendered(function onCreated() {
  const { data } = this;
  const { bindConfirmEvent } = data;
  const form = this.$('form[data-action="basic-info-form"]');
  bindConfirmEvent(() => {
    form.submit();
  });
});

Template.ModalEvents.events({
  'click button[data-action="open-modal"]'(event, tmpl) {
    ModalManager.create({
      title: "Modal with Events",
      contentTemplateName: "BasicInfoForm",
      contentData: {
        onSubmit: (formData) => {
          tmpl.basicInfo.set(formData);
        },
      },
    });
  },
});
