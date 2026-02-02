import http from "node:http";
import test from "ava";
import got from "got";
import app from "../server.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);		// δημιουργία του server
	const server = t.context.server.listen();		// εκκίνηση του server
	const { port } = server.address();			// λήψη της θύρας στην οποία τρέχει ο server
	t.context.got = got.extend({ 
		responseType: "json", 					//Θα κάνει αυτόματα parse τα JSON responses.
		prefixUrl: `http://localhost:${port}` 	// Βασική διεύθυνση για όλα τα αιτήματα.
	});	
});

test.after.always((t) => {
	t.context.server.close();	// Κλείνουμε τον server για να τερματίσει σωστά το script
});

test("GET /books returns all books" , async t =>{
	const {body , statusCode} = await t.context.got("books");
	t.is(statusCode , 200);
	t.true(Array.isArray(body));
});

test("POST /books creates a new book", async t => {
	const newBook = {
		title: "Test Book",
		authorId: 1,
		categoryId: 1
	};
	const {body, statusCode} = await t.context.got.post("books", {
		json: newBook
	});
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
	t.truthy(body.title);
});

test("GET /books/:bookId returns a specific book", async t => {
	const {body, statusCode} = await t.context.got("books/1");
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
	t.truthy(body.id !== undefined);
});

test("PUT /books/:bookId updates a book", async t => {
	const updatedBook = {
		title: "Updated Book Title",
		authorId: 1,
		categoryId: 1
	};
	const {body, statusCode} = await t.context.got.put("books/1", {
		json: updatedBook
	});
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
});

test("DELETE /books/:bookId deletes a book", async t => {
	const {statusCode} = await t.context.got.delete("books/1");
	t.is(statusCode, 200);
});

test("GET /authors returns all authors", async (t) => {
    const {body, statusCode} = await t.context.got("authors");
    t.is(statusCode, 200);
    t.true(Array.isArray(body));
});

test("POST /authors creates a new author", async (t) => {
    const newAuthor = {
        name: "Test Author"
    }
    const {body, statusCode} = await t.context.got.post("authors", {
		json: newAuthor
	});
    t.is(statusCode, 200);
    t.is(typeof body, 'object');
    t.truthy(body.name);
});

test("GET /authors/:authorId returns a specific author", async (t) => {
	const {body, statusCode} = await t.context.got("authors/1");
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
	t.truthy(body.id !== undefined);
	t.truthy(body.name);
});

test("PUT /authors/:authorId updates an author", async (t) => {
	const updatedAuthor = {
		name: "Updated Author Name"
	};
	const {body, statusCode} = await t.context.got.put("authors/1", {
		json: updatedAuthor
	});
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
});

test("DELETE /authors/:authorId deletes an author", async (t) => {
	const {statusCode} = await t.context.got.delete("authors/1");
	t.is(statusCode, 200);
});

test("GET /categories returns all categories", async (t) => {
	const {body, statusCode} = await t.context.got("categories");
	t.is(statusCode, 200);
	t.true(Array.isArray(body));
});

test("POST /categories creates a new category", async (t) => {
	const newCategory = {
		name: "Test Category"
	};
	const {body, statusCode} = await t.context.got.post("categories", {
		json: newCategory
	});
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
	t.truthy(body.name);
});

test("GET /categories/:categoryId returns a specific category", async (t) => {
	const {body, statusCode} = await t.context.got("categories/1");
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
	t.truthy(body.id !== undefined);
	t.truthy(body.name);
});

test("PUT /categories/:categoryId updates a category", async (t) => {
	const updatedCategory = {
		name: "Updated Category Name"
	};
	const {body, statusCode} = await t.context.got.put("categories/1", {
		json: updatedCategory
	});
	t.is(statusCode, 200);
	t.is(typeof body, 'object');
});

test("DELETE /categories/:categoryId deletes a category", async (t) => {
	const {statusCode} = await t.context.got.delete("categories/1");
	t.is(statusCode, 200);
});

// Error handling tests to increase coverage
test("GET /books/:bookId handles invalid ID", async (t) => {
	try {
		await t.context.got("books/invalid");
	} catch (error) {
		t.pass(); // Error is expected
	}
});

test("POST /books handles invalid data", async (t) => {
	try {
		await t.context.got.post("books", {
			json: { invalid: "data" }
		});
	} catch (error) {
		t.pass(); // Error is expected
	}
});

test("GET /authors/:authorId handles invalid ID", async (t) => {
	try {
		await t.context.got("authors/invalid");
	} catch (error) {
		t.pass(); // Error is expected
	}
});

test("GET /categories/:categoryId handles invalid ID", async (t) => {
	try {
		await t.context.got("categories/invalid");
	} catch (error) {
		t.pass(); // Error is expected
	}
});


