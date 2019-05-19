const serverConfig = {
  assetsRoot: 'http://localhost:3001/',
  port: 3000,
  databaseConnectionURL: 'mongodb://localhost:27017/Contest',
  session: {
    privateKeyPath: '/config/private.key',
    publicKeyPath: '/config/public.key'
  }
};

module.exports = serverConfig;