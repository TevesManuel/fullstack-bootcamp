const test_phone = require('./Controllers/Phone');
const db = require('./../src/db');

db.setup_db().then(() => {
    const asynchronousFunctions = [
        test_phone.run_all(),
    ];
    Promise.all(asynchronousFunctions).then(() => {
        db.turn_off()
    });
});