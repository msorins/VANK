const addNewAccount = require('./OperationsFunction/addNewAccount').addNewAccount;
const showClosest = require('./OperationsFunction/showClosest').showsClosest;

const operations = {
    "show_closest" : showClosest,
    "add_new_account": addNewAccount
};

const security_map = {
    "show_closest" : false,
    "add_new_account": true
};

exports.operations = operations;
exports.security_map = security_map;
