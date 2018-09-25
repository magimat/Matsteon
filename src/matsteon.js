const IOLINC_ID = "22D4EC"
const LIGHT_CABANON_ID = "1B3F94"
const LIGHT_CUISINE_ID = "1864C0"
const LIGHT_MAISON_ID = "1A21DF"

const PLM_PORT = "/dev/ttyUSB0"

const API_PORT = 3000

var Insteon = require('home-controller').Insteon;
var express = require('express');
var mqtt = require('mqtt')
var clientMQTT  = mqtt.connect('mqtt://localhost')
 

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
      console.log(status)
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



addLightEventsListeners(plm.light(LIGHT_CUISINE_ID))
addLightEventsListeners(plm.light(LIGHT_MAISON_ID))
addLightEventsListeners(plm.light(LIGHT_CABANON_ID))

function addLightEventsListeners(light) {
  light.on('turnOn', function () {lightOn(light.id)});
  light.on('turnOnFast', function () {lightOn(light.id)});
  light.on('brightened', function () {lightOn(light.id)});
  light.on('turnOff', function () {lightOff(light.id)});
  light.on('turnOffFast', function () {lightOff(light.id)});
  light.on('dimmed', function () {lightOff(light.id)});
}

plm.ioLinc(IOLINC_ID).on('sensorOn', function () {garageClosed()});
plm.ioLinc(IOLINC_ID).on('sensorOff', function () {garageOpen()});



function lightOn(id) {
  clientMQTT.publish('smartthings/' + id.match(/.{1,2}/g).join(".") + '/switch', 'on')
  console.log(id + ' is on')
}

function lightOff(id) {
  clientMQTT.publish('smartthings/' + id.match(/.{1,2}/g).join(".") + '/switch', 'off')
  console.log(id + ' is off')
}

function garageClosed() {
  clientMQTT.publish('smartthings/garage/switch', 'off')
  console.log('porte garage fermée')
}

function garageOpen() {
  clientMQTT.publish('smartthings/garage/switch', 'on')
  console.log('porte garage ouverte')
}







// link devide as controller and as responder

//plm.link('1864C0', function(error, link) {});
//plm.link('1864C0', {controller: true}, function(error, link) {});


