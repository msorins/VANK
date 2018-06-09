const addNewAccount = require('./OperationsFunction/addNewAccount').addNewAccount;
const showClosest = require('./OperationsFunction/showClosest').showsClosest;

const operations = {
    "show_closest" : showClosest,
    "add_new_account": addNewAccount
};

exports.operations = operations;
