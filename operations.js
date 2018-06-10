const addNewAccount = require('./OperationsFunction/addNewAccount').addNewAccount;
const showClosest = require('./OperationsFunction/showClosest').showsClosest;
const creditOptions = require('./OperationsFunction/creditOptions').creditOption;
const blockCard = require('./OperationsFunction/blockCard').blockCard;
const cardRenewal = require('./OperationsFunction/cardRenewal').cardRenewal;
const showPromotions = require('./OperationsFunction/showPromotions').showPromotions;
const accountInfo = require('./OperationsFunction/accountInfo').accountInfo;
const spendingStatistics = require('./OperationsFunction/spendingStatistics').spendingStatistics;
const checkTransactions = require('./OperationsFunction/checkTransactions').checkTransactions;

const operations = {
    "show_closest" : showClosest,
    "add_new_account": addNewAccount,
    "credit_options": creditOptions,
    "block_card": blockCard,
    "card_renewal": cardRenewal,
    "show_promotions": showPromotions,
    "account_info": accountInfo,
    "spending_statistics": spendingStatistics,
    "check_transactions": checkTransactions

};

const security_map = {
    "show_closest" : false,
    "add_new_account": true
};

exports.operations = operations;
exports.security_map = security_map;
