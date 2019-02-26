# VANK

## Video demo
[![](http://img.youtube.com/vi/VHMttsEij1Y/0.jpg)](http://www.youtube.com/watch?v=VHMttsEij1Y "VANK | Demo")

## Screens
![Demo Image ](https://github.com/msorins/VANK/blob/master/0.PNG?raw=true "Demo Image")

![Demo Image ](https://github.com/msorins/VANK/blob/master/1.PNG?raw=true "Demo Image")

![Demo Image ](https://github.com/msorins/VANK/blob/master/2.PNG?raw=true "Demo Image")

![Demo Image ](https://github.com/msorins/VANK/blob/master/3.PNG?raw=true "Demo Image")


# Idea
*A virtual software assistant for banks*

Staying in queues in order to talk to a representant of your bank can turn into a waste of time, so how would it be if you could do frequent operations right from your favourite Messenger Client ?

# How does it work

In order to extract the intent of messages received from user we use WitAi.
It has the following configuration

![Demo Image ](https://github.com/msorins/VANK/blob/master/4.PNG?raw=true "Demo Image")

*intent_operation* is the core trait, as it encapsulates all the different operation that a user can do:
* card_renewal
* block_card
* check_transactions
* spending_statistics
* account_info
* credit_options
* show_promotions
* show_closest
* add_new_account

Besides that, there are defined all the keywords that an user could write, in our case there are *currencies* (RON, USD, EUR), *sum of money*, *date*

# Pipeline 
So, when a message is received the pipeline wold look something like this:
1. send message to witAI
2. get response
3. base on the entities provided by witAI (intent operation and keywords) compute and send a response

# Technologies used

### BackEnd:
* NodeJs
* WitAi for extracting the meaning of messages


> The Project was realised in the 2nd year of university (June 2018), in a team of 4 during a 48 hours hackathon. I implemented a few of the operations presented above + the interaction with WitAi.