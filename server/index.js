// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const cors = require('cors');

const {fileExists, createDataForDb, writeDbFile, isAuthorized} = require('./core');

const authToken = 'mySuperSecureToken';
const pathToDb = path.join(__dirname, 'db.json');

const setupAndLaunchServer = function (server) {
  const router = jsonServer.router('db.json');
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(jsonServer.bodyParser);

  server.post('/login', (req, res) => {
    return res.json({token: authToken});
  });

  server.use((req, res, next) => {

    if (isAuthorized(req, authToken)) { // add your authorization logic here
      return next(); // continue to JSON Server router
    }

    res.sendStatus(401);
  });
  server.use(router);
  
  const PORT = 3000;

  server.listen(PORT, () => {
    console.log('JSON Server is running on port ' + PORT)
  });
};

fileExists(pathToDb)
  .then(() => {
    console.log('db.json exists so launching server');
    setupAndLaunchServer(server)
  })
  .catch((err) => {
    console.log('db.json doesn\'t exist, creating file');
    createDataForDb()
      .then(([users, estates]) => {
        const data = {
          users,
          estates
        };
        writeDbFile(JSON.stringify(data));
        setupAndLaunchServer(server);
      });
  });





