const BootBot = require('bootbot'); //https://github.com/Charca/bootbot
const express = require('express');
const options = require('./options');
const operations = require('./operations').operations;
const {Wit, log} = require('node-wit');

const bot = new BootBot({
    accessToken: options.accessToken,
    verifyToken: options.verifyToken,
    appSecret: options.appSecret
});



const wit = new Wit({
    accessToken: options.witToken,
    logger: new log.Logger(log.DEBUG) // optional
});


// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function operationSelector(chat, data) {
    // Get first & most probable entity
    if("intent_operation" in data["entities"])
        var intentOperation = data["entities"]["intent_operation"][0];
    else
        return "Intent operation not recognised";

    let operationValue = intentOperation["value"];
    let entities = data["entities"];

    // Return the response ( a string with the message for the computed operation )
    return operations[operationValue](chat, entities);
}

// Users
bot.on('message', (payload, chat) => {
    // Receive message from payload.sender.id

    var a = 3;
    wit.message(payload.message.text, JSON.stringify(payload.message.nlp))
        .then((data) => {
            // write an answer to the user
            chat.setAttribute('hello', 'world');
            chat.say("Blabla");
            // chat.say( operationSelector(chat, data) );
            chat.end();
        })
        .catch(console.error);
});

bot.start();
