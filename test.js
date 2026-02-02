const http = require('http');
const test = require('ava');
const got = require('got');
const app = require('../index.js');

test.before(async t => {
    t.context.server = http.createServer(app);
    const server = await t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        prefixUrl: `http://localhost:${port}`,
        responseType: 'json',
    });
});


test.after.always(async t => { t.context.server.close(); });

test('GET /books returns 200', async (t) => {
    const {statusCode} = await t.context.got.get('books');
    t.is(statusCode, 200);
})

test('GET /books/1 returns 200', async (t) => {
    const {statusCode} = await t.context.got.get('books/1');
    t.is(statusCode, 200);
})

test('DELETE /books/1 returns 204', async (t) => {
    const {statusCode} = await t.context.got.delete('books/1');
    t.is(statusCode, 204);
})

test('POST /books returns 201', async (t) => {
    const {statusCode} = await t.context.got.post('books', {
        json: {
            title: 'Test Book',
            author_id: 1,
            category_id: 1,
            published_year: 2024
        }
    });
    t.is(statusCode, 201);
})

test('PUT /books/1 returns 200', async (t) => {
    const {statusCode} = await t.context.got.put('books/1', {
        json: {
            title: 'Updated Book',
            author_id: 1,
            category_id: 1,
            published_year: 2024
        }
    });
    t.is(statusCode, 200);
})

test('GET /authors returns 200', async (t) => {
    const {statusCode} = await t.context.got.get('authors');
    t.is(statusCode, 200);
})

test('GET /authors/1 returns 200', async (t) => {
    const {statusCode} = await t.context.got.get('authors/1');
    t.is(statusCode, 200);
})

test('DELETE /authors/1 returns 204', async (t) => {
    const {statusCode} = await t.context.got.delete('authors/1');
    t.is(statusCode, 204);
})

test('POST /authors returns 201', async (t) => {
    const {statusCode} = await t.context.got.post('authors', {
        json: {
            name: 'Test Author'
        }
    });
    t.is(statusCode, 201);
})

test('PUT /authors/1 returns 200', async (t) => {
    const {statusCode} = await t.context.got.put('authors/1', {
        json: {
            name: 'Updated Author'
        }
    });
    t.is(statusCode, 200);
})

test('GET /categories returns 200', async (t) => {
    const {statusCode} = await t.context.got.get('categories');
    t.is(statusCode, 200);
})

test('GET /categories/1 returns 200', async (t) => {
    const {statusCode} = await t.context.got.get('categories/1');
    t.is(statusCode, 200);
})

test('DELETE /categories/1 returns 204', async (t) => {
    const {statusCode} = await t.context.got.delete('categories/1');
    t.is(statusCode, 204);
})

test('POST /categories returns 201', async (t) => {
    const {statusCode} = await t.context.got.post('categories', {
        json: {
            name: 'Test Category'
        }
    });
    t.is(statusCode, 201);
})

test('PUT /categories/1 returns 200', async (t) => {
    const {statusCode} = await t.context.got.put('categories/1', {
        json: {
            name: 'Updated Category'
        }
    });
    t.is(statusCode, 200);
})