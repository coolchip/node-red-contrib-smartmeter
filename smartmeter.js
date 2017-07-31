module.exports = function (RED) {
	'use strict';
	var smartmeterObis = require('smartmeter-obis');

	function SmartmeterNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		node.smartmeterConnection = RED.nodes.getNode(config.connection);
		if (node.smartmeterConnection) {
			var options = {
				'protocol': config.protocol,
				'transport': config.transport,
				'transportSerialPort': node.smartmeterConnection.serialport,
				'transportSerialBaudrate': node.smartmeterConnection.serialbaud,
				'transportSerialDataBits': node.smartmeterConnection.databits,
				'transportSerialStopBits': node.smartmeterConnection.stopbits,
				'transportSerialParity': node.smartmeterConnection.parity,
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

			var smTransport = smartmeterObis.init(options, sendData);
			smTransport.process();

			node.on('close', function () {
				smTransport.stop();
			});
		}
	}
	RED.nodes.registerType('smartmeter', SmartmeterNode);
}