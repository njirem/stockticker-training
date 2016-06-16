// Imports
const { Server } = require('ws');
const { Observable } = require('rxjs');

// Server
const port = 9000;
const server = new Server({ port });
function broadcast(data) {
    let json = JSON.stringify(data);
    server.clients.forEach(client => client.send(json));
}

// Logging
const events = ['close', 'connection', 'error', 'listening', 'message'];
function log(obj) { events.forEach(evt => obj.on(evt, value => console.log(`${evt} (${value})`))); }
log(server);
server.on('connection', log);

// Logic
const startPrice = 100;
function calculatePrice(current) {
    return Math.max(0, current * (1.025 - Math.random() / 20));
}
Observable.timer(0, 100)
    .scan(calculatePrice, startPrice)
    .forEach(price => broadcast({ price }));