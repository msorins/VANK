function addNewAccount(context, entities) {
    currencies = ["eur", "ron", "euro", "gbp", "usd"];

    if("currency" in entities) {
        let currency = entities["currency"][0].value.toLowerCase();
        if(currencies.includes(currency))
            return "A new account in " + currency.toUpperCase() + " was added";
        else {
            context['intent-type'] = "add_new_account";
            context['param-needed-currency'] = true;
            return "I couldn't really understand your currency, could you please repeat it?";
        }
    } else {
        context['intent-type'] = "add_new_account";
        context['param-needed-currency'] = true;
    }

    return "I will create a new account for your right away, can you just provide a currency ?";
}

exports.addNewAccount = addNewAccount;
