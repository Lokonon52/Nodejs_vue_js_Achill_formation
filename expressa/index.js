require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require('cors');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authsRouter = require("./routes/auth");
const resetPasswordRouter = require('./routes/resetPassword');
const sequelize = require("./database/postgres");

sequelize;

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "http://localhost:8080",  // Autoriser les connexions depuis cette origine
      methods: ["GET", "POST"],
      credentials: true
  }
});
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authsRouter);
app.use("/password", resetPasswordRouter);
app.use(helmet());
app.use(morgan("combined"));

app.use((req, res, next) => {
  const error = new Error("url not found");
  error.status = 404;
  next(error);
});

io.on('connection',(socket) => {
  console.log('User conneted');
  socket.on('message', (msg) => {
    console.log('mesage:', msg);

    io.emit('message',msg)
  })

})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Internal error",
    },
  });
});

server.listen(PORT, () => {
  console.log(`L'application d'exemple écoute sur http://localhost:${PORT}`);
});
