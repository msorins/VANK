const addNewAccount = require('./OperationsFunction/addNewAccount').addNewAccount;
const showClosest = require('./OperationsFunction/showClosest').showsClosest;
const creditOptions = require('./OperationsFunction/creditOptions').creditOption;

const operations = {
    "show_closest" : showClosest,
    "add_new_account": addNewAccount,
    "credit_options": creditOptions
};

exports.operations = operations;
