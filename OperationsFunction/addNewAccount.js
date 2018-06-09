function addNewAccount(context, chat, entities) {
    currencies = ["eur", "ron", "euro", "gbp", "usd"];

    if("currency" in entities) {
        let currency = entities["currency"][0].value.toLowerCase();

        if(currencies.includes(currency)) {
            // if all the parameters (currency in this case) are supplied & correct =>  operation finished
            delete context['intent-type'];
            delete context['param-needed-currency'];
            chat.say( "A new account in " + currency.toUpperCase() + " was added." );
            return;
        }

        else {
            // if the currency is supplied but is not recognised
            context['intent-type'] = "add_new_account";
            context['param-needed-currency'] = true;
            chat.say("I couldn't really understand your currency, could you please repeat it?");
            return;
        }
    } else {
        // if the currency is not provided
        context['intent-type'] = "add_new_account";
        context['param-needed-currency'] = true;
        chat.say( "I will create a new account for your right away, can you just provide a currency?");
        return;
    }


}

exports.addNewAccount = addNewAccount;
