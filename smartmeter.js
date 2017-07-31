module.exports = function (RED) {
	'use strict';
	var SmartmeterObis = require('smartmeter-obis');

	function SmartmeterNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		node.serialConfig = RED.nodes.getNode(config.serial);
		if (node.serialConfig) {
			var options = {
				'protocol': config.protocol,
				'transport': config.transport,
				'transportSerialPort': node.serialConfig.serialport,
				'transportSerialBaudrate': node.serialConfig.serialbaud,
				'transportSerialDataBits': node.serialConfig.databits,
				'transportSerialStopBits': node.serialConfig.stopbits,
				'transportSerialParity': node.serialConfig.parity,
				'requestInterval': config.requestInterval,
				'obisNameLanguage': 'de',
				'obisFallbackMedium': 6
			};

			function sendData(obisResult) {
				const msg = {
					payload: obisResult
				};
				node.send(msg);
			}

			var smTransport = SmartmeterObis.init(options, sendData);
			smTransport.process();

			node.on('close', function () {
				smTransport.stop();
			});
		}
	}
	RED.nodes.registerType('smartmeter', SmartmeterNode);
}