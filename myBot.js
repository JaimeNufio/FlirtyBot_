console.log("Running.");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
var stream = T.stream('user');

stream.on('tweet', tweetEvent);

function findFlirt(){
	return "Are you from Alabama  because you look like your mom and dad are sibblings ;)";
}

function tweetEvent(eventMsg){
	
	var toWhom  = eventMsg.in_reply_to_screen_name;
	var tweetGot = eventMsg.text;tweetGot
	var other = eventMsg.user.screen_name;

	if (toWhom  == 'FlirtyBot_' && tweetGot.contains(";)")){
		var newTweet = "@"+other+" "+findFlirt();
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

