const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.set('io', io);


var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};


// we are using cors middleware to solve security problems
// 'Access-Control-Allow-Origin'
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./app/models");

// if there is no table, create table. if there is a table, get it.
db.sequelize.sync();


//Websocket connection
io.on('connection', (socket) => {
  console.log(`A user connected with id=${socket.id}`);

  socket.emit('test event', 'THIS IS DATA FROM SERVER!!!');

  socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));

  socket.on('newMatch', function (data) {
    // console.log('chat event trigged at server');
    // console.log('need to notify all the clients about this event');
    console.log("New match event triggedered.");
    io.sockets.emit('newMatch', data);
  });

  // socket.broadcast.on("sendUpdatedMatch", data => {
  //   console.log("!!!!!!! Update match event activated from front-end.");
  //   socket.broadcast.emit("Updatedmatch", data);
  // });

  // Yeni Insert Match
  // socket.broadcast.on("sendSaveMatch", match => {
  //   console.log("Saved Match:" + match.name.first + ' ' + match.name.last);
  //   socket.broadcast.emit("Savedmatch", match);
  // });

  //  Yeni Delete Match
  //  socket.broadcast.on("sendDeleteMatch", match => {
  //   console.log("Deleted Match:" + match.name.first + ' ' + match.name.last);
  //   socket.broadcast.emit("Deletedmatch", match);
  // });
  // //-------------------------------
});




// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to livescore application."
  });
});


require("./app/routes/match.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;


server.listen(PORT, () => {
  console.log(`Socket.io server is listening on port ${PORT}.`);
});