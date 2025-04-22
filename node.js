// var http = require('http');
var feather = require('feather-icons');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var fs = require('fs');
var feather = require('feather-icons');
var odoo = require('odoo-xmlrpc');
var io = require('socket.io')(http);
var MQTT = require('mqtt');
const { timeStamp } = require('console');

// const mqttClient = {};
var devicesTopic = [];
var devicesStatus = [];
const brokerURL = 'ws://network.kapitmas.com:8083';
const host = 'localhost';
const port = 8000;

const mqttOption = {
  clean: false,
  clientId: 'MQTT Dashboard - NodeJS',
}


const rpc_url = 'http://101.128.65.6';
const rpc_port = 8069;
const db = 'KAPITMAS_TES_DES';
const username = 'admin';
const password = '5302420932c81b3e453be9804b55e1f436cb624a'
// const password = 'wibicon2020'
var isFetching = false;
var isListening = false;
var data;

var mqtt = MQTT.connect(brokerURL, mqttOption);

var rpc = new odoo({
  url:rpc_url,
  port:rpc_port,
  db:db,
  username:username,
  password:password
});

rpc.connect(rpcHandler);

function rpcHandler(err){
  if(err) return console.log('Error Response for : ' + err);
  console.log('Connected to Odoo Server');
  var inParams = [];
  // inParams.push('read');
  // inParams.push(false); //raise_exception
  var params = [];
  params.push(inParams);
  setInterval(()=>{
    if(isFetching) return;
      isFetching = true;
      try{
        rpc.execute_kw('wibicon.iot.device', 'get_data_rpc', params, function (err, value) {
          if (err) { return console.log(err); }
            value.forEach(devices => {
              devices.topic = devices.topic.substring(0, devices.topic.lastIndexOf('/'));
            })
            data = value;
            
          });
      } catch (err){
        console.log(err);
      } finally{
        WrapBrokerData();
        isFetching = false;
      }
    }, 5000);
  }

  
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next){
  res.sendFile(__dirname + '/public/index.html');
  
});
http.listen(port, host);

function SubscribeDevicesStatus(topic){
  topicStatus = topic + '/status'
  if(devicesTopic.every(topics => topics !== topicStatus)){
    console.log('registering MQTT')
    mqtt.subscribe(topicStatus, (err)=>{
      if(!err) devicesTopic.push(topicStatus);
    });
  }
}
function WrapBrokerData(){
  try{
    data.forEach(device => {
      SubscribeDevicesStatus(device.topic);
    });
  }
  catch(err){
    console.log(err);
  }
}

function processDataStatus(topic, msg){
  try{
    obj = JSON.parse(msg);
    obj['device'] = topic.substring(topic.indexOf('/') + 1, topic.lastIndexOf('/'));
    console.log(obj);
    devicesStatus.push({
      name: obj['device'],
      status: obj['status'],
      timeStamp: obj['timestamp']
    });
  }catch(err){
    console.log(err);
  }finally{
    return obj;
  }
}

function mqttHandlerListener(topic, msg){

  // console.log(topic.toString() + ' : ');
  // console.log(msg.toString());
  if(topic.endsWith('/status')){
    processDataStatus(topic, msg);
  }

}

io.on('connection', (socket) => {
  // console.log('CONNEDTED');
  setInterval(()=>{
    socket.emit('devices-data', data);
    socket.emit('devices-status', devicesStatus);
  }, 1500);
  
// console.log('Result: ', data);
});

mqtt.on('message', mqttHandlerListener);