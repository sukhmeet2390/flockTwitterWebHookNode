'use strict';

module.exports = function(loginParams, FlockPostURL, keyword, duration) {
  var module = {};
  duration = duration || 1000 * 60 * 60 * 24; // Default is 24 hours

  var Twit = require('twit');
  var axios = require('axios');
  axios.defaults.headers.post['Content-Type'] = 'application/application/json';

  var twitterDate = function() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
  };
  var T = new Twit({
    consumer_key: loginParams.consumerKey,
    consumer_secret: loginParams.consumerSecret,
    access_token: loginParams.accessToken,
    access_token_secret: loginParams.accessTokenSecret,
  });

  module._doAjaxCall = function(){
    var twitterDt = twitterDate();
    console.log(twitterDt);
    T.get('search/tweets', {q: keyword+' @'+keyword+' since:' + twitterDt, count: 100}, function(err, data, response) {
        for (var i = 0; i < data.statuses.length; i++) {
          var el = data.statuses[i];
          axios.post(FlockPostURL, {
            send_as: {
              name: 'Flock in last 24 hrs',
            },
            text: 'https://twitter.com/' + el.user.screen_name + '/status/' + el.id_str,
            content: {
              title: 'Twitter',
              description: el.text,
              source: 'https://twitter.com/' + el.user.screen_name + '/status/' + el.id_str,
              mime_type: 'text/html',
              provider_name: 'Twitter',
              type: 'url-unfurler',
              previews: [{
                mime_type: 'image/png',
                source: el.user.profile_image_url_https,
                width: 40,
              },],
            },
          });
        }
      });
  }
  module.startTwitterInterval = function() {
    this._doAjaxCall();
    var self = this;
    setInterval(function() {
      self._doAjaxCall();
    }, duration); 
  };
  return module;
};

