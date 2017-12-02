var send = require("./send");
function check() {
  var now = new Date();
  console.log(now);
  var then = new Date();
  then.setTime(Date.parse('2017-11-30T23:32:00'));
  console.log(then);
var same = now.getTime() <= then.getTime();
  if (same){
    console.log("ITS HAPPENING");
  }
  else{
    console.log("not yet");
  }
}

exports.check=check;