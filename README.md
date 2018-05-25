## node-red-contrib-smartmeter
[![npm version](https://badge.fury.io/js/node-red-contrib-smartmeter.svg)](https://badge.fury.io/js/node-red-contrib-smartmeter)
[![Dependency Status](https://david-dm.org/coolchip/node-red-contrib-smartmeter.svg)](https://david-dm.org/coolchip/node-red-contrib-smartmeter)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/coolchip/node-red-contrib-smartmeter)

#### Node-RED Node, that reads and parses the data from smartmeter devices. Supports for example Hager eHz Energy Meter, EMH Energy Meter, EFR SmartGridHub, Siemens 2WR5, Elster AS1440, Iskraemeco MT174, Itron EM214 Typ 720.

This work depends on the smartmeter Module ([smartmeter@github](https://github.com/Apollon77/smartmeter-obis) and [smartmeter@npm](https://www.npmjs.com/package/smartmeter-obis)).

### Install
Just run
```
    npm install node-red-contrib-smartmeter
```

### How to use
Connect your reader and configure the smartmeter node.

### Example
```text
[{"id":"55761f32.81b66","type":"smartmeter","z":"58f83f17.8d781","name":"","ip":"192.168.0.20","port":"8888","x":460,"y":400,"wires":[["294e49ea.47ce96"]]},{"id":"2be68b81.81e9a4","type":"inject","z":"58f83f17.8d781","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":260,"y":400,"wires":[["55761f32.81b66"]]},{"id":"294e49ea.47ce96","type":"debug","z":"58f83f17.8d781","name":"","active":true,"console":"false","complete":"false","x":670,"y":400,"wires":[]}]
```
