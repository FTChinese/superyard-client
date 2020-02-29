import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import router from './routes/mod';

const app = new Koa();

app.proxy = true;
// This is just a hex string from random bytes,
// genrated from the test file `test/random.test.js`
app.keys = ['17022cc8025947ec'];

app.use(logger());
app.use(bodyParser());

app.use(router.routes());

// Create HTTP server
const server = app.listen(process.env.PORT || 3100);

// Listening event handler
server.on('listening', () => {
  console.log('Mock API running on port %o', server.address());
});
