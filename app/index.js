const serve = require('koa-static');
const mount = require('koa-mount');
const compress = require('koa-compress');
const Koa = require('koa');
const cryptogotchiApp = new Koa();
const dependenciesApp = new Koa();
const webServer = new Koa();

// Configure cryptogotchi frontend
cryptogotchiApp.use(serve('app/public'));

// Configure dependencies app
dependenciesApp.use(serve('node_modules/'));

// Configure webserver
webServer.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));
webServer.use(mount('/', cryptogotchiApp));
webServer.use(mount('/node_modules', dependenciesApp));

// Start webserver
webServer.listen(3000);

console.log('listening on port 3000');