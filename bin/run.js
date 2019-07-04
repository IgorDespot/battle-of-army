const http = require('http');
const service = require('../server/service')();
const { logger } = require('../config/log');

const server = http.createServer(service);
server.listen(3000);

server.on('listening', () => {
  logger.info(`Server is listening on port ${server.address().port} in ${service.get('env')} mode`);
});
