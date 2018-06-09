function addNewAccount(chat, entities) {
    currencies = ["eur", "ron", "euro", "gbp", "usd"];

    if("currency" in entities) {
        let currency = entities["currency"][0].value.toLowerCase();
        if(currencies.includes(currency))
            return "A new account in " + currency.toUpperCase() + " was added";
        else {
            chat.set('intent-type', "add_new_account");
            chat.set('param-needed-currency', true);
            return "I couldn't really understand your currency, could you please repeat it?";
        }

    }

    return "I will create a new account for your right away, can you just provide a currency ?";
}

exports.addNewAccount = addNewAccount;
