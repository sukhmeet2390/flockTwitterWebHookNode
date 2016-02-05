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
	date.setDate(date.getDate()-1);
	return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()); 
}
var T = new Twit({
	consumer_key:'9c1TgiSK8K8ZaAEM1Om37f3tu',
	consumer_secret:'3QaBjIRjyodUVZrKYMrHsPySkg7CB35ZJ1hE5YShStsyfLRkRp',
	access_token:  '70208549-oiOsK0C94GYWgmY25Qiv46uZOlLpUVKB1sFv8UjxO',
	access_token_secret:'PYm96rArFO4IrqLIee27AKuIc4Ad9qy99zJwfFHtNjwOS'
});
axios.defaults.headers.post['Content-Type'] = 'application/application/json';



var twitterDt = twitterDate();
console.log(twitterDt);

setInterval(function(){
	T.get('search/tweets', { q: 'flockchat @flockchat since:'+twitterDt, count: 10 }, function(err, data, response) {
  		for(var i=0; i< data.statuses.length; i++){
  			var el = data.statuses[i];
  			axios.post(FlockUrl,{
  				'send_as': {
  					'name' : 'Flock in last 24 hrs'	
  				},
  				'text': 'https://twitter.com/'+el.user.screen_name+'/status/'+el.id_str,
  				"content": { 
			      "title": "Twitter",
			      "description": el.text,
			      "source": 'https://twitter.com/'+el.user.screen_name+'/status/'+el.id_str,
			      "mime_type": "text/html",
			      "provider_name": "Twitter",
			      "type":"url-unfurler",
			      "previews": [{
			         "mime_type": "image/png",
			         "source": el.user.profile_image_url_https,
			         "width": 40
			       }]
			   },
  			})

  		}
  		console.log('-----------');
	});
},1000*5); // every 1 hour
