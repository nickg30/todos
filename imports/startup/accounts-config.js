import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'Account Type',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Gender',
        inputType: 'radio',
        radioLayout: 'inline',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Trainer',          // label for the radio element
            value: 'trainer',              // value of the radio element, this will be saved.
            }, {
            id: 2,
            label: 'Client',
            value: 'client',
            checked: 'checked'
        }],
        visible: true
    }]
})
