'use strict';

module.exports = {};
var ONE_HOUR = 60*60*1000;

var Twit = require('twit');
var axios = require('axios');
var FlockUrl = 'https://api.flock.co/hooks/sendMessage/258b056d-e019-493e-b560-6c9a4f4141ad';
// eg : curl -X POST -H 'Content-type: application/json' -d '{ "text":  "some text"}' https://api.flock.co/hooks/sendMessage/<token>

var twitterDate = function(){
	var date = new Date();
	date.setDate(date.getDate()-1);
	return date.getFullYear() + "-" + (date.getMonth())+1 + "-" + (date.getDate()); 
}
var T = new Twit({
	consumer_key:'9c1TgiSK8K8ZaAEM1Om37f3tu',
	consumer_secret:'3QaBjIRjyodUVZrKYMrHsPySkg7CB35ZJ1hE5YShStsyfLRkRp',
	access_token:  '70208549-oiOsK0C94GYWgmY25Qiv46uZOlLpUVKB1sFv8UjxO',
	access_token_secret:'PYm96rArFO4IrqLIee27AKuIc4Ad9qy99zJwfFHtNjwOS'
});
axios.defaults.headers.post['Content-Type'] = 'application/application/json';



var twitterDt = twitterDate();
console.log('============');
console.log(twitterDt);

setInterval(function(){
	T.get('search/tweets', { q: 'flockchat since:'+twitterDt, count: 10 }, function(err, data, response) {
		var sendFlockText = "";
  		for(var i=0; i< data.statuses.length; i++){
  			var el = data.statuses[i]
  			sendFlockText += el.user.screen_name+ " ::" + el.text;
  			axios.post(FlockUrl,{
  				text : sendFlockText
  			})
  			console.log(JSON.stringify(el.user));

  		}
  		console.log('-----------');
	});
},ONE_HOUR); // every 1 hour
