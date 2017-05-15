const IOLINC_ID = "22.D4.EC"
const PLM_PORT = "/dev/ttyUSB1"
const API_PORT = 3000

var Insteon = require('home-controller').Insteon;
var express = require('express');

var app = express();

var plm = new Insteon();
plm.serial(PLM_PORT, function () {
  app.listen(API_PORT);
});


app.get('/light/:id/on', function(req, res){
  plm.light(req.params.id).turnOn()
  .then(function (status) {
    if(status.response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/light/:id/off', function(req, res){
  plm.light(req.params.id).turnOff()
  .then(function (status) {
    if(status.response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});


app.get('/light/:id/dim/:level', function(req, res){
  plm.light(req.params.id).turnOn(req.params.level)
  .then(function (status) {
    if(status.response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});


app.get('/light/:id/status', function(req, res){
  plm.light(req.params.id).level()
  .then(function (level) {
    res.send(level.toString());
  });
});


app.get('/garage/bouton', function(req, res){
  var io = plm.ioLinc(IOLINC_ID); 
  io.relayOn()
  .then(function (status) {
    if(status.response) {
      io.relayOff()
      .then(function (status) {
        if(status.response) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      });
      return;
    } else {
      res.sendStatus(404);
    }
  });
});


app.get('/garage/status', function(req, res){
  plm.ioLinc(IOLINC_ID).status()
  .then(function (status) {
    res.send(((status.sensor == 'off') ? 'ouvert' : 'fermé'));
  });
});


