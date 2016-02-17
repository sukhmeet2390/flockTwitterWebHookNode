# twitter-web-hook-node [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

## Installation

```sh
$ npm install --save twitter-webhook-flock
```

## Usage

```js
var twitterWebHookNode = require('twitter-webhook-flock');

var loginKeys = {
    consumerKey: <twitter.Consumer Key >
    consumerSecret: <twitter.Consumer Secret>
    accessToken: <twitter.Access Token>
    accessTokenSecret: <twitter.Access Token Secret>
  };
var flockPostUrl = <Incoming webhook URL >;
var keyword = 'flockchat';
var postInternval = 60*60*1000; // defaults to 24 hrs if not specified

var T = new twitterWebHookNode(loginKeys, flockPostUrl, keyword, postInterval);
T.startTwitterInterval()

```
## License

MIT © [Sukhmeet Singh]()


[npm-image]: https://badge.fury.io/js/twitter-webhook-flock.svg
[npm-url]: https://npmjs.org/package/twitter-webhook-flock
[travis-image]: https://travis-ci.org/sukhmeet2390/twitter-webhook-flock.svg?branch=master
[travis-url]: https://travis-ci.org/sukhmeet2390/twitter-webhook-flock
[daviddm-image]: https://david-dm.org/sukhmeet2390/twitter-webhook-flock.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sukhmeet2390/twitter-webhook-flock