/**
 * USAGE:
 *
 * Reference of the component class exposed in the global scope,
 * or with additional implementation, the component could be distributed
 * as a module that can be imported into a project of any JS framework
 *
 */

const inputConstructor = window.CreditcardInput;

inputConstructor.define();

const inputInstance = inputConstructor.getInstance();
inputInstance.setCardNumberValidator(() => console.log('Run custom card number validation'))

document.querySelector('#form-example').onsubmit = (e) => {
  e.preventDefault()
  console.log(inputInstance.getFieldsValues());
}
