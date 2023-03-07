# Modal samples

These examples demonstrate how to use modals (components) passing reactive variables or passing callback functions to
the content component modal.

### Demo video 
[Demo video](videos/meteor-blaze-sample.mp4)


https://user-images.githubusercontent.com/12865401/223526465-5ba958e7-afad-458b-a71c-34e3659e438c.mp4


**Modal component implementation**

* [Source code: JS](imports/ui/modal/modal.js)
* [Source code: HTML](imports/ui/modal/modal.html)

# Using modal with reactive variables

In this example, we use a component inside the modal to change values from a reactive variable. In this case, we pass
the reactive variable reference (not a value `.get()`) to the modal component. And the modal passes the data to the
content component to deal with the value.

* [Source code: JS](imports/ui/modal/modal-rvar.js)
* [Source code: HTML](imports/ui/modal/modal-rvar.html)

```javascript
// Passing reactive variable on property contentData
// imports/ui/modal/modal-rvar.js

ModalManager.create({
    title: "Modal with Reactive var",
    contentTemplateName: "modalContent1",
    contentData: {counter: tmpl.counter},
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

In this example, we use a component inside the modal to register user information using a form. In this case, we pass a
method by param on `onSubmit` to receive the event when the form is submitted. We want to use the confirm button to submit
the form, so on the `onRendered` event for the `BasicInfoForm` component, we will bind confirm event to submit the form.

* [Source code: JS](imports/ui/modal/modal-events.js)
* [Source code: HTML](imports/ui/modal/modal-events.html)

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
    const {data} = this;
    const {bindConfirmEvent} = data;
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
        const {onSubmit} = tmpl.data || {};
        const {target} = evt;
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

[Live Demo](https://meteor-blaze-samples-prod-quave.svc.zcloud.ws/)
