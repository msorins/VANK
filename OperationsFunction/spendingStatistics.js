function spendingStatistics(context, chat, entities) {
    if("datetime" in entities) {
        var fromString;
        var toString;

        if("from" in entities["datetime"][0] && "to" in entities["datetime"][0]) {
            var from = new Date(entities["datetime"][0]["from"]["value"]);
            var to = new Date(entities["datetime"][0]["to"]["value"]);
        } else {
            var from = new Date(entities["datetime"][0]["value"]);
            var to = new Date();
        }

        fromString = from.getDate() + "." + from.getMonth() + "." + from.getFullYear();
        toString = to.getDate() + "." + to.getMonth() + "." + to.getFullYear();

        chat.say("Showing you the spending statistics from " + fromString + " to " + toString );
    } else {
        chat.say("You haven't specified an interval, so am going to show you the spendings from the last 3 days");
    }

    chat.sendTemplate(
        {
            "template_type": "receipt",
            "recipient_name": "Mircea Sorin-Sebastian",
            "order_number": "1432423121",
            "currency": "RON",
            "payment_method": "BT Card",
            "order_url": "https://www.google.ro/",
            "timestamp": "1",
            "address": {
                "street_1": "BD. Grivitei, Nr 41, Bl 29, Sc B, Ap 43",
                "city": "Brasov",
                "postal_code": "500177",
                "state": "Romania",
                "country": "Romania"
            },
            "summary": {
                "subtotal": 60,
                "shipping_cost": 20,
                "total_tax": 20,
                "total_cost": 100
            },
            "elements": [
                {
                    "title": "Techsylvania Shirt",
                    "subtitle": "Size XL",
                    "quantity": 2,
                    "price": 200,
                    "currency": "RON",
                    "image_url": "https://cdn.dribbble.com/users/4908/screenshots/2787171/invoice-animation-dribbble.gif"
                }
            ]
        }
    )

}

exports.spendingStatistics = spendingStatistics;
