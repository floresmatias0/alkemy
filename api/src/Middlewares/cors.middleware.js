const server = require('express').Router();
const cors = require('cors');

server.use(cors({
  credentials: true,
  origin: "http://localhost:3000" || "*"
}));

module.exports = server;