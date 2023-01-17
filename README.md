## How to run

- Open "index.html"
- After filling the fields and clicking the "Submit" button the component fields state
is logged in the browser devtools console

## How to use

With additional implementation for it to be fully functional (e.g. form submit logic),
the component can be used as a standalone component.

### For standalone usage:

  - Add the below script tag inside the head tag of a webpage:
    `<script src="./creditcard-input.js"></script>`
  - Insert the tag `<creditcard-input></creditcard-input>` anywhere in the body of the page

### For usage inside another application:

Another usage mode is exemplified in the file `usage.js`. The component can be imported
into the code of any web application by using `CreditcardInput` class to render and configure it.
- Import `CreditcardInput` into your project
- Place the component tag to be rendered where desired
  - Call `define()` for initializing the component
  - Call `getInstance()` to get access to the functionalities of the component instance
    - Call `setCardNumberValidator()` for providing a custom card number validation logic if necessary
    - Call `getFieldsValues()` for accessing the internal fields state of the component
