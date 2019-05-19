import minimist from 'minimist'

const argv = minimist(process.argv.slice(2));
const productionMode = argv.mode === 'production';

export const serverConfig =
    productionMode ?
        require('./production.server.config')
        :
        require('./development.server.config');

console.log(
    productionMode ?
        'Contest server is starting with production mode...'
        :
        'Contest server is starting with development mode...');