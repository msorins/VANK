const BootBot = require('bootbot'); //https://github.com/Charca/bootbot
const express = require('express');
const options = require('./options');
const operations = require('./operations').operations;
const security_map = require('./operations').security_map;
const {Wit, log} = require('node-wit');

const bot = new BootBot({
    accessToken: options.accessToken,
    verifyToken: options.verifyToken,
    appSecret: options.appSecret
});

var context = { 'login': false, 'login_in_progress': false };

// timeout
setInterval(() => {context['login'] = false;}, 10000000);

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
            //chat.say("Intent operation not recognised");
            return;
        }
    }

    let entities = data["entities"];

    console.log(context)

    if (context['login_in_progress']) {
      step = context['login_step']
      if(step == 1) {
        context['account_id'] = data["_text"];
        context['login_step'] = 2;
        chat.say("Great! Please record yourself speaking the secret phrase and send me the audio message.", { typing: true });
        // TODO(cosmin) send text message with the audio phrasee
      } else if(step == 2) {
        // here we should get an attachment, if we get here
        // we send instructions
        chat.say("Please record yourself speaking the secret phrase and send me the audio message.", { typing: true });
      }
      return
    }

    // Compute the operation
    if (security_map[operationValue] == true && context['login'] == false) {
      // the only case when we need to login again:
      // login false and security true
      context['login_in_progress'] = true;
      context['login_step'] = 1;
      context['pending_operation'] = operations[operationValue];
      context['pending_context'] = context;
      context['pending_chat'] = chat;
      context['pending_entities'] = entities;
      chat.say("What is your account id?", { typing: true });
    } else {
      operations[operationValue](context, chat, entities);
    }
}

bot.hear(['thanks', /thank/, 'thank', 'thank you', /congrats/, 'congrats', 'congratulations'], (payload, chat) => {
	// Send a text message with buttons
	chat.say("I'm happy to help!", {typing: true});
});

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

// Welcome
bot.setGetStartedButton((payload, chat) => {
  const welcome1 = `Hey there, thank you for choosing our bank.`
  const welcome2 = `Let me know how can I help you!`;
  const options = { typing: true };
  chat.say(welcome1, options)
    .then(() => chat.say(welcome2, options));
});

bot.on('attachment', (payload, chat) => {
  // TODO check here if login in progress and login step == 2 and attachment type is sound
  // then validate using the API
  console.log('An attachment was received!');
  att = payload['message']['attachments'][0]
  if(context['login_in_progress'] && context['login_step'] == 2 && att['type'] == 'audio') {
    // TOOD check the validitor of att['payload']['url']
    context['login'] = true;
    context['login_in_progress'] = false;
    context['login_step'] = undefined;
	  chat.say("Great, we succesfully authenticated you! Let's continue helping you!", {typing: true})
      .then(() => {
    context['pending_operation'](context['pending_context'],
      context['pending_chat'],
      context['pending_entities']); });
  }
});

bot.start();
