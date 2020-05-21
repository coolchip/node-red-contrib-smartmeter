module.exports = function (RED) {
    'use strict';

    function SmartmeterConnectionNode(n) {
        RED.nodes.createNode(this, n);
        this.serialport = n.serialport;
        this.serialbaud = parseInt(n.serialbaud) || 57600;
        this.databits = parseInt(n.databits) || 8;
        this.parity = n.parity || 'none';
        this.stopbits = parseInt(n.stopbits) || 1;
        this.hostname = n.hostname || 'localhost';
        this.hostport = n.hostport || 80;
        this.filepath = n.filepath || '';
        this.tcphost = n.tcphost || 'localhost';
        this.tcpport = n.tcpport || 502;
    }
    RED.nodes.registerType('smartmeter-connection', SmartmeterConnectionNode);

    RED.httpAdmin.get('/serialports', RED.auth.needsPermission('serial.read'), function (req, res) {
        var serialport = require('serialport');
        serialport.list(function (err, ports) {
            if (err) return console.log(err)
            res.json(ports);
        });
    });
}