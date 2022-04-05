module.exports = function (RED) {
	'use strict';
	var smartmeterObis = require('smartmeter-obis');

	function SmartmeterNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		node.smartmeterDatasource = RED.nodes.getNode(config.datasource);
		if (node.smartmeterDatasource) {
			var options = {
				'protocol': config.protocol,
				'transport': config.transport,
				'transportSerialPort': node.smartmeterDatasource.serialport,
				'transportSerialBaudrate': node.smartmeterDatasource.serialbaud,
				'transportSerialDataBits': node.smartmeterDatasource.databits,
				'transportSerialStopBits': node.smartmeterDatasource.stopbits,
				'transportSerialParity': node.smartmeterDatasource.parity,
				'requestInterval': config.requestInterval,
				'protocolD0WakeupCharacters': config.d0WakeupCharacters,
				'protocolD0SignOnMessage': config.d0SignOnMessage,
				'protocolD0BaudrateChangeoverOverwrite': config.d0BaudrateChangeoverOverwrite,
				'protocolSmlIgnoreInvalidCRC': config.protocolSmlIgnoreInvalidCRC,
				'transportHttpRequestUrl': `${node.smartmeterDatasource.httphost}:${node.smartmeterDatasource.httpport}`,
				'transportLocalFilePath': node.smartmeterDatasource.filepath,
				'transportTcpHost': node.smartmeterDatasource.tcphost,
				'transportTcpPort': node.smartmeterDatasource.tcpport,
				'obisNameLanguage': 'de',
				'obisFallbackMedium': 6,
                'debug': config.debugging ? 2 : 0,
                'logger': (log) => console.log(log),
			};

			function sendData(err, obisResult) {
				if (err) {
					return RED.log.error(`smartmeter-obis error: ${err}`);
				}
				const msg = {
					payload: obisResult
				};
				node.send(msg);
			}

			var smTransport;
			
			if (config.requestInterval >= 0 ) {
				smTransport = smartmeterObis.init(options, sendData);
				smTransport.process();
			}

			node.on('close', function () {
				smTransport.stop();
			});
			
			node.on('input', function() {
				if (!smTransport.protocol.isProcessComplete()) {
                			node.warn("Previous process hasn't finished yet");
                			return;
            			}
				if (config.requestInterval < 0 ) {
					smTransport = smartmeterObis.init(options, sendData);
				}
				smTransport.process();
			});
		}
	}
	RED.nodes.registerType('smartmeter', SmartmeterNode);
}
