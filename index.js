
var http, director, bot, router, server, port, send, reminder;

//http 
http        = require('http');
//routing
director    = require('director');
// bot.js contains the "respond" method for parsing 
// requests and contructing a message
bot         = require('./bot.js');
// send contains a function (post) to send a message 
// included here for testing purposes only
send        = require("./send.js");
// reminder contains ("check") to see if any reminders have become due
reminder    = require("./reminder.js");

// ping if accessed at root url
router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

// create server to respond to callbacks
server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

//persistent reminders
var interval = setInterval(function() {
  console.log("checking:");
  reminder.check();
},1200000);

function ping() {
  this.res.writeHead(200);
  this.res.end("pssst... it's me, stalkerbot");
}