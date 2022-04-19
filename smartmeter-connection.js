module.exports = function (RED) {
    'use strict';
    const serialp = require('serialport');

    function SmartmeterConnectionNode(n) {
        RED.nodes.createNode(this, n);
        this.serialport = n.serialport;
        this.serialbaud = parseInt(n.serialbaud) || 57600;
        this.databits = parseInt(n.databits) || 8;
        this.parity = n.parity || 'none';
        this.stopbits = parseInt(n.stopbits) || 1;
        this.httphost = n.httphost || 'localhost';
        this.httpport = n.httpport || 80;
        this.filepath = n.filepath || '';
        this.tcphost = n.tcphost || 'localhost';
        this.tcpport = n.tcpport || 502;
    }
    RED.nodes.registerType('smartmeter-connection', SmartmeterConnectionNode);

    RED.httpAdmin.get("/smartmeter-serialports", RED.auth.needsPermission('serial.read'), function(req,res) {
        serialp.list().then(
            ports => {
                const a = ports.map(p => p.path);
                res.json(a);
            },
            err => {
                res.json([RED._(`serialport.list() error: ${err}`)]);
            }
        )
    });
}