const serverConfig = {
  assetsRoot: 'http://localhost:3001/',
  port: 3000,
  databaseConnectionURL: 'mongodb://localhost:27017/Contest',
  authorization: {
    allowedLogins: [],
    sessionSecret: 'yDyTP3T3Dvc4206O8pmKHIUE123n34hkqOd1'
  }
}

module.exports = serverConfig