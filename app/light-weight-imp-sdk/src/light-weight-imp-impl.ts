import express from 'express';
import thread from 'threads';
const app = express()

export class LWII {
    static async start() {
        app.get('/', function (req, res) {
            console.log('running code')
            res.send('Hi this is light weight image server');
        })
        app.get('/upload', function (req, res) {
            
        })
        app.listen(6060)
    }
}
LWII.start();