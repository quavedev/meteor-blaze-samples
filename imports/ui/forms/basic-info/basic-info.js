import "./basic-info.html";

Template.BasicInfoForm.onCreated(function onCreated() {
  console.info("BasicInfoForm created.");
});
Template.BasicInfoForm.events({
  'submit [data-action="basic-info-form"]'(evt, tmpl) {
    evt.preventDefault();
    const { onSubmit } = tmpl.data || {};
    const { target } = evt;
    const formData = {
      firstName: target.firstName?.value,
      lastName: target.lastName?.value,
      email: target.email?.value,
    };
    if (onSubmit) {
      onSubmit(formData);
    }
  },
});

Template.BasicInfoDisplay.helpers({
  basicInfo() {
    return Template.instance().data?.basicInfo || {};
  },
});
