const TAG_NAME = 'creditcard-input';
const CARD_NUMBER_FIELD_ID = 'card-number';
const EXP_DATE_FIELD_ID = 'exp-date';
const SEC_CODE_FIELD_ID = 'sec-code';
const CONSUMER_NAME_FIELD_ID = 'consumer-name';

class CreditcardInput extends HTMLElement {
    constructor() {
        super();

        const container = document.createElement('div');
        container.className = 'creditcard-input-container';

        const style = document.createElement("style");
        style.textContent = `
            .creditcard-input-container {
                display: flex;
                flex-wrap: wrap;
                max-width: 600px;
                gap: 8px;
            }

            .creditcard-input-fields {
                display: flex;
                flex-direction: column;
                width: 250px;
                max-width: 250px;
            }`;

        container.innerHTML = `
            <div class="creditcard-input-fields">
                <label htmlFor="${CARD_NUMBER_FIELD_ID}">
                    Card number*
                </label>
                <input
                    type="text"
                    id="${CARD_NUMBER_FIELD_ID}"
                    name="card_number"
                    placeholder="enter card number"
                    required
                />
            </div>
            <div class="creditcard-input-fields">
                <label htmlFor="${EXP_DATE_FIELD_ID}">
                    Exp. Date*
                </label>
                <input
                    type="date"
                    name="trip-start"
                    value="${this._formatDate(new Date())}"
                    min="${this._formatDate(new Date())}"
                    max="2100-12-31"

                    type="text"
                    id="${EXP_DATE_FIELD_ID}"
                    name="exp_date"
                    placeholder="enter exp. date"
                    required
                />
            </div>
            <div class="creditcard-input-fields">
                <label htmlFor="${SEC_CODE_FIELD_ID}">
                    Security Code*
                </label>
                <input
                    type="text"
                    id="${SEC_CODE_FIELD_ID}"
                    name="sec_code"
                    placeholder="enter security code"
                    required
                />
            </div>
            <div class="creditcard-input-fields">
                <label htmlFor="${CONSUMER_NAME_FIELD_ID}">
                    Consumer Name
                </label>
                <input
                    type="text"
                    id="${CONSUMER_NAME_FIELD_ID}"
                    name="consumer_name"
                    placeholder="enter consumer name"
                />
            </div>
        `

        this.shadowRootRef = this.attachShadow({
            mode: 'open'
        });
        this.shadowRootRef.appendChild(container);
        this.shadowRootRef.appendChild(style);

        window.customElements.whenDefined(TAG_NAME).then(() => {
            this.shadowRootRef.getElementById(CARD_NUMBER_FIELD_ID).onblur = () => {
                if (this.customCardNumberValidator) {
                    this.customCardNumberValidator();
                    return
                }

                console.log('Run default card number validation')
            }
        })
    }

    getFieldsValues() {
        return {
            cardNumber: this.shadowRootRef.getElementById(CARD_NUMBER_FIELD_ID).value,
            expDate: this.shadowRootRef.getElementById(EXP_DATE_FIELD_ID).value,
            secCode: this.shadowRootRef.getElementById(SEC_CODE_FIELD_ID).value,
            consumerName: this.shadowRootRef.getElementById(CONSUMER_NAME_FIELD_ID).value,
        }
    }

    setCardNumberValidator(validator) {
        this.customCardNumberValidator = validator;
    }

    static define() {
        try {
            window.customElements.define(TAG_NAME, CreditcardInput);
        } catch (err) {
            console.log(`Unable to (re)define ${TAG_NAME}`);
        }
    }

    // Does not support multiple creditcard-input element on the same page
    static getInstance() {
        const instance = document.querySelector(TAG_NAME);

        if (!instance) {
            console.error('Component instance not found')
            return;
        }

        return instance;
    }

    _formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}`
    }
}

(() => {
    window.CreditcardInput = CreditcardInput;
})()
