import express from 'express'
import WebSocket, { WebSocketServer } from 'ws';

const app = express()
const httpServer = app.listen(8080, () => {
    console.log('the server is running on the port 8080')
})
const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', function message(data ,isBinary) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data ,{binary :isBinary});
            }
        })
    })

})

