console.log("Running. Tweet away ;)");

var Twit = require('twit');
var config = require('./config');
var flirts = require('./flirts');

var T = new Twit(config);
var stream = T.stream('user');

stream.on('tweet', tweetEvent);

//console.log(flirts.phrases);

function findFlirt(){
	
	
	var possible =  flirts.phrases[Math.floor(Math.random()*flirts.phrases.length)];

	while (possible.length >  119){
		
		possible =  flirts.phrases[Math.floor(Math.random()*flirts.phrases.length)];
	}
	
	return possible+";)";
}

function tweetEvent(eventMsg){
	
	var toWhom  = eventMsg.in_reply_to_screen_name;
	var tweetGot = eventMsg.text;tweetGot
	var other = eventMsg.user.screen_name;

	if (toWhom  == 'FlirtyBot_' && tweetGot.includes(";)")){
		var newTweet = ".@"+other+" "+findFlirt();
		sendTweet(newTweet);
	}
}

function sendTweet(txt){
	var tweet = {
		status:txt
	}  

	T.post('statuses/update',tweet,tweeted);
}

function tweeted(error, data, response){
	if (error){
		console.log(data);
	} else {
		console.log("I just tweeted ;D");
	}
}

