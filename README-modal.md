# Modal samples

This sample demonstrates how to use modals (components) passing reactive variables or passing callback functions to the content component modal.

# Modal with reactive variables

```javascript
// Passing reactive variable on property contentData
// imports/ui/modal/modal-rvar.js

ModalManager.create({
  title: "Modal with Reactive var",
  contentTemplateName: "modalContent1",
  contentData: { counter: tmpl.counter },
});

// Using on template modalContent1 rendered inside modal content.
// imports/ui/modal/modal-rvar.js

Template.modalContent1.helpers({
  counter() {
    return Template.instance().data.counter.get();
  },
});
```

# Modal with events (callback functions)

```javascript
// Passing event callback on property contentData
//imports/ui/modal/modal-events.js

ModalManager.create({
  title: "Modal with Events",
  contentTemplateName: "BasicInfoForm",
  contentData: {
    onSubmit: (formData) => {
      tmpl.basicInfo.set(formData);
    },
  },
});

// Binding confirmation action to trigger submit component form.
// imports/ui/modal/modal-events.js

Template.BasicInfoForm.onRendered(function onCreated() {
  const { data } = this;
  const { bindConfirmEvent } = data;
  const form = this.$('form[data-action="basic-info-form"');
  bindConfirmEvent(() => {
    form.submit();
  });
});

// Using onSubmit callback event to send form data.
// imports/ui/forms/basic-info/basic-info.js

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
```
