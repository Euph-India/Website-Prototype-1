const express = require('express');
const app = express();
const port = process.env.PORT || process.env.port || 3000;

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

const { QuickDB } = require("quick.db");
const db = new QuickDB({
    filePath: "main.db"
});

const fs = require('fs');

const session = require('express-session');

var sqlite = require("better-sqlite3");
var SqliteStore = require("better-sqlite3-session-store")(session)
var seshdb = new sqlite("sessions.db", { verbose: console.log });

app.use(session({
    store: new SqliteStore({
        client: seshdb, 
        expired: {
          clear: true,
          intervalMs: 900000 //ms = 15min
        }
      }),
    secret: 'euphindia on the TOP!!',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.engine('ejs', require('express-art-template'));
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

fs.readdir('./routes', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(file => {
        require('./routes/' + file)(app, io, db);
    });
});

fs.readdir('./backend', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(file => {
        require('./backend/' + file)(app, io, db);
    });
});

server.listen(port, () => {
    console.log('listening on *:' + port);
});