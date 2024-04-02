const axios = require('axios');
const PhoneModel = require('../../src/Models/Phone.js');
const phoneController = require('../../src/Controllers/Phone.js');
const runner = require('./../runner.js');
const assert = require('assert');

const test_01_createPhone = () => {
    let phoneModel = PhoneModel({
        name: 'Test',
        number: '221 3058662',
    });

    return phoneController.createPhone(phoneModel).then((phoneCreated) => {
        assert(true, phoneModel.name == phoneCreated.name);
        assert(true, phoneModel.number == phoneCreated.number);
    });
}
const test_02_checkLength = () => {
    return phoneController.getAllPhones().then(phones => {
        phoneController.getPhoneLength().then(length => {
            assert(true, 1 == length);
        });
    });
}

module.exports.run_all = () => {
    return Promise.all([
        runner.run_test(test_01_createPhone, "test_01_createPhone"),
        runner.run_test(test_02_checkLength, "test_02_checkLength"),
    ]);
};