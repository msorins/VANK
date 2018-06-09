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

var context = {};

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
    let operationValue;
    if("intent_operation" in data["entities"]) {
        var intentOperation = data["entities"]["intent_operation"][0];
        operationValue = intentOperation["value"];
    }
    else {
        if("intent-type" in context) {
            operationValue = context["intent-type"];
        } else {
            chat.say("Intent operation not recognised");
            return;
        }
    }

    let entities = data["entities"];

    // Compute the operation
    operations[operationValue](context, chat, entities);
}

// Users
bot.on('message', (payload, chat) => {
    // Receive message from payload.sender.id

    wit.message(payload.message.text, JSON.stringify(payload.message.nlp))
        .then((data) => {
            // write an answer to the user
            operationSelector(chat, data);
        })
        .catch(console.error);
});

bot.on('attachment', (payload, chat) => {
    console.log('An attachment was received!');
});

bot.start();
