# Form Validation
This sandbox repo is currently configured as a form validation tool, using [Lookoutjs](https://github.com/estrattonbailey/lookoutjs) and native getters/setters.

## Usage
Pass the config object to `form()`, specifying a `<form>` element, and the inputs that you want to bind to.

This script creates an observable object – the model – using Lookoutjs, and binds the passed event on the DOM node to update the values in the model. It validates by overriding the `setter` method for each property on the model, first validating the values before updating the model.
```javascript
var dateTime = form({
  form: '.js-form',
  fields: [
    {
      el: '.js-email', 
      validation: 'email',
      event: 'keyup'
    },
    {
      el: '.js-name', 
      validation: 'string',
      event: 'keyup'
    }
  ] 
});
```

## Todo
1. Expand validation capabilities.
2. Add classes to the inputs that contain errors.
3. Potentially pass the error value onto the `watch()` method of Lookoutjs.
4. Create generic interface for creating a new form, perhaps checking a `data-attribute` for validation keywords on specific inputs:
```javascript
var dateTime = form({
  form: '.js-form',
  inputs: '.js-input',
  event: 'change'
});
```
