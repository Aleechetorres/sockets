/* const cors = require('cors');
app.use(cors()); */

const Server = require('./models/server');
require('dotenv').config();

const server = new Server();

server.execute();



