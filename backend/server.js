
const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg');

const app = new Koa();
// app.use(cors());

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    await next();
  });

const router = new Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


router.get('/campsites', async (ctx) => {
    const { rows } = await pool.query('SELECT * FROM campsites;');
    ctx.body = rows;
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

