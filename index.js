var fs = require('fs');
var exec = require('child_process').exec;
var serialport = require('serialport');
var SerialPort = serialport.SerialPort
var sp = new SerialPort("/dev/tty.wchusbserialfa130", {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
}, false);

var status = [0, 0, 0, 0, 0, 0, 0, 0];
var scale = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do_']

runPiano = function (data) {
  arrData = data.toString().split(":");
  for (var i = 0, len = arrData.length; i < len; i++) {
    if (Number(arrData[i])) {
      if(status[i]) continue;
      status[i] = 1;
      exec('afplay mp3/' + scale[i] + '.mp3');
    } else {
      status[i] = 0;
    }
  }
}

sp.open(function (error) {
  if (error) {
    console.log('failed to open: ' + error);
  } else {
    sp.on('data', function(data) {
      runPiano(data);
    });
  }
});

