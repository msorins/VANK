const request = require('request');
var bodyParser = require('body-parser')

function showClosest(chat, entities) {
    var latLong = "46.771210, 23.623635" //Your Position
    var bankName = "ING";                //Bank Name

    const optionATM = {
        app_id: '5RhZL0a3NEMuIPy0krdM',
        app_code: 'emA8E4u6dphk67n4Dwsx2A',
        at: '46.771210,23.623635',
        cat: 'atm-bank-exchange',
        q:'transilvania'
    }
    
    const optionsATM = {  
        url: 'https://places.cit.api.here.com/places/v1/autosuggest',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        },
        qs: optionATM
    };
    
    const optionDistance = {
        app_id: '5RhZL0a3NEMuIPy0krdM',
        app_code: 'emA8E4u6dphk67n4Dwsx2A',
        waypoint0: 'geo!52.5,13.4',
        waypoint1: 'geo!52.5,13.4',
        mode: 'fastest;car;traffic:disabled'
    }
    
    const optionsDistance = {  
        url: 'https://route.cit.api.here.com/routing/7.2/calculateroute.json',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        },
        qs: optionDistance
    };
    
    var loc;
    
    request(optionsATM, (err, res, body) => 
    {
        optionATM.at = latLong              //Your Geolocation
        optionATM.q  = bankName                                 //The name of the bank
        optionDistance.waypoint0 = "geo!" + optionATM.at
    
        
    
        var min = 9999999999;
        var nr = 0;
    
        if (err) { return console.log(err)} 
    
        body = JSON.parse(body);    
        
        var flag = 0;
        body.results.forEach(element => 
        {
            
            if(element.position!=undefined)
            {
                optionDistance.waypoint1 = "geo!" + element.position;
                request(optionsDistance, (err, res, body1) => 
                {   //console.log(body1.length);
                    body1 = JSON.parse(body1);
                    var dis =  (body1.response.route[0].summary.distance);
                    if(dis<min)
                    {
                        //console.log('R:' + body1.length);
                        min = dis;
                        loc = element.position;
    
                       
                    }
                    flag++;
                    console.log(dis);
                    if(flag==body.results.length)
                    
                    return "http://www.google.com/maps/place/" + loc;
                });
            }
        });
    });
}

exports.showsClosest = showClosest;