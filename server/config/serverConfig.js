import minimist from 'minimist'

const argv = minimist(process.argv.slice(2));
const developmentMode = argv.mode === 'development';

export const serverConfig =
    developmentMode ?
        require('./development.server.config')
        :
        require('./production.server.config');

console.log(
    developmentMode ?
        'Contest server is starting with development mode...'
        :
        'Contest server is starting with production mode...');