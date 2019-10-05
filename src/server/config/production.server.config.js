const serverConfig = {
  assetsRoot: '/assets/',
  port: 3000,
  databaseConnectionURL: 'mongodb://localhost:27017/Contest',
  authorization: {
    salt: 'fhy8e4th84wfdufhe8w7ufjsdu89jvcfd9uivchjef'
  },
  session: {
    privateKeyPath: '/private.key',
    publicKeyPath: '/public.key'
  }
};

module.exports = serverConfig;