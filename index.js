const express = require("express");
const app = express();
const port = process.env.PORT || process.env.port || 3000;

const http = require("http");
const server = http.createServer(app);

const dotenv = require("dotenv");
dotenv.config();

const io = require("socket.io")(server);

const { QuickDB, MySQLDriver } = require("quick.db");

(async () => {
  const mysqlDriver = new MySQLDriver({
    host: process.env.DB_HOST,
    user: "sql12660470",
    password: process.env.DB_PASSWORD,
    database: "sql12660470",
  });
  await mysqlDriver.connect();
  var db = new QuickDB({ driver: mysqlDriver });

  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const fs = require("fs");

  const session = require("express-session");
  const MySQLStore = require("express-mysql-session")(session);

  app.use(
    session({
      store: new MySQLStore({
        port: 3306,
        host: process.env.DB_HOST,
        user: "sql12660470",
        password: process.env.DB_PASSWORD,
        database: "sql12660470",
      }),
      secret: "euphindia on the TOP!!",
      resave: true,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

  app.engine("ejs", require("express-art-template"));
  app.set("view engine", "ejs");

  app.use(express.static("public"));

  fs.readdir("./routes", (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach((file) => {
      require("./routes/" + file)(app, io, db);
    });
  });

  fs.readdir("./backend", (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach((file) => {
      require("./backend/" + file)(app, io, db);
    });
  });

  (async () => {
    if (!(await db.get("products"))) {
      await db.set("products", []);
    }
    if (!(await db.get("coupons"))) {
      await db.set("coupons", []);
    }
    if (!(await db.get("affiliate"))) {
      await db.set("affiliate", []);
    }
    if (!(await db.get("checkouts"))) {
      await db.set("checkouts", []);
    }
  })();

  server.listen(port, () => {
    console.log("Listening on port " + port);
  });
})();
