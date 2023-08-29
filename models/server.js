// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path')
const Sockets = require('./sockets');

class Server {
  constructor() {

    this.app = express();;
    this.port = 8080;

    //Configuración Htpp server
    this.server = http.createServer(this.app);

    // Configuración de sockets server
    this.io = socketio(this.server, {/* Configuraciones de como funciona el socket*/});
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static( path.resolve(__dirname, '../public') ));
  }

  //Metodo para configurar sockets
  configurarSockets() {
    new Sockets(this.io);
  }

  //Metodo para iniciarlo 
  execute() {
    //Inicializar Middlewares
    this.middlewares();

    //Inicializar Sockets
    this.configurarSockets();

    //Inicializar server 
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto :', this.port)
    })
  }
}

module.exports = Server;