const { syncAndSeed } = require('./db')
const runCron = require('./cron')
const app = require('./app')

///////// PORT //////////////
const PORT = process.env.PORT || 8080;

const init = async () => {
    try {
        await syncAndSeed()
        await app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
        
        await runCron()
        
    }
    catch (err) {
        console.log(err)
    }
}
init()

/////////// Experimenting with websocket and socket.io for realtime monitoring //////////////////

///// ws ///////
// const ws = require('ws')
// let webSocket;
// const server = await app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
// const webSocket = new ws.Server({ server })
// let sockets = [];

// webSocket.on('connection', (socket) => {
//     // adds new connection to sockets array to keep track of all connected clients
//     sockets.push(socket);

//     // this filters out the socket where the message is coming from so it only broadcasts to all other clients
//     socket.on('message', (data) => {
//         sockets.filter(s => s !== socket).forEach(s => s.send(data));
//     });
//     // this filters out sockets that have disconnected so messages only go to currently connected clients
//     socket.on('close', () => {
//         sockets = sockets.filter(s => s !== socket);
//     });
// });