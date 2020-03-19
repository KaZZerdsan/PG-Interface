const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const { Client } = require('pg')

const client = new Client({
    user: 'username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 'port',
    })

const app = new Koa();
const router = new Router();

app.use(koaBody());

let currentRows;

function parseRequest(req) {
    let str = ''
    for (const i of Object.keys(req)) {
        str += `'${req[i]}',`;
    }
    str = str.substring(0, str.length-1);
    return str;
}


async function getTables() {
    try {
        await client.connect();
    }
    catch(e){}
    const res = await client.query(
        'SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN (\'information_schema\',\'pg_catalog\');');
    let tables = [];
    res.rows.forEach(table => tables.push(table.table_name));
    tables.forEach(table => {
        router
            .get(`${table}Get`, `/api/${table}`, async(ctx) => {
            try {
                await client.connect();
            }
                catch(e) {
                }
            
            const res = await client.query(`SELECT * FROM ${table}`);
            ctx.body = res.rows;
        })

            .post(`${table}Post`, `/api/${table}`, async(ctx) => {
                const req = ctx.request.body;
                try {
                    await client.connect();
                }
                    catch(e) {}
                await client.query(
                    `INSERT INTO ${table} VALUES(${parseRequest(req)});`
                );
                ctx.body = 'success';
        })

            .delete(`${table}Delete`, `/api/${table}`, async(ctx) => {
                if (ctx.request.query.id) {
                    try {
                        await client.connect();
                    }
                        catch(e) {
                        }
                    const res = await client.query(
                        `DELETE FROM ${table} WHERE ID='${ctx.request.query.id}'`
                    );
                    ctx.status = 204
                    ctx.body = res;
                }
                else {
                    ctx.status = 400;
                    ctx.body = 'No id for delete.';
                }
            })
    })
}

router.get('getFields', '/api/fields', async(ctx) => {
    try {
        await client.connect();
    }
        catch(e) {
        }

    if (ctx.request.query.table) {
        const res = await client.query(
            `SELECT column_name FROM information_schema.columns WHERE table_name = '${ctx.request.query.table}';`
        )
        currentRows = [];
        res.rows.forEach(row => currentRows.push(row.column_name));
        ctx.body = res.rows;
    }
})



router.get('getTables', '/api/tables', async function (ctx) {
    try {
        await client.connect();
    }
    catch(e){}
    const res = await client.query(
        'SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN (\'information_schema\',\'pg_catalog\');');
    ctx.body = res.rows;
})

app.use(router.routes())

    .use(router.allowedMethods())

    .use(async (ctx, next) => {
        await next();
        const rt = ctx.response.get('X-Response-Time');
        console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    });

getTables();


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
