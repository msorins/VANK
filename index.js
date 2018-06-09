const BootBot = require('bootbot'); //https://github.com/Charca/bootbot
const express = require('express');
const options = require('./options');

const bot = new BootBot({
    accessToken: options.accessToken,
    verifyToken: options.verifyToken,
    appSecret: options.appSecret
});

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Users
bot.on('message', (payload, chat) => {
    // Receive message
    console.log(`Message from ${payload.sender.id}`);

    // Add message
    bot.say(payload.sender.id, "Hello:)");
});

bot.start();
