const server = require('./api/server');

const port = process.env.port || 4210;

server.listen(port, () => console.log(`eveasdropping on port: ${port}`))