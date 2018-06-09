myVoiceIt = require('VoiceIt');

file = 'credentials.json';
fs = require('fs');
fs.readFile(file);


var fs = require('fs');

fs.readFile('crdentials.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
});

console.log(obj);


myVoiceIt.initialize(user_key);
//Pass your 32 digit developer id as parameter to the intialize method like shown above


myVoiceIt.getUser({
    userId: usr,
    password: pwd,
    callback: function(response){
    //ADD CUSTOM CODE HERE TO USE
    //DATA RECEIVED IN THE response VARIABLE
    console.log("The Server Responded with the JSON: ", response);
    }
});


myVoiceIt.authenticationByWavURL({
    userId: usr,
    password: pwd,
    urlToAuthenticationWav: 'https://voiceit.tech/voicePrint.wav',
    contentLanguage: 'en-US',
    callback: function(response){
    console.log("The Response Was ",response);
    }
});
