const BootBot = require('bootbot'); //https://github.com/Charca/bootbot
const express = require('express');
const options = require('./options');
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


// Users
bot.on('message', (payload, chat) => {
    // Receive message from payload.sender.id
    bot.say( payload.sender.id, "Server received your message" );

    wit.message(payload.message.text, {})
        .then((data) => {
            // got response from wit
            bot.say( payload.sender.id, JSON.stringify(data) );
        })
        .catch(console.error);
});

bot.start();
