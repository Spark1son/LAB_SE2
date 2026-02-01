import http from "node:http";
import test from "ava";
import got from "got";
import app from "../server.js";
import { error } from "node:console";

 test("Test passes", (t) => {  t.pass();  });


// test("Test fails", (t) => {
// 	t.fail();
// });

test("Test throws", (t) => {         
    t.throws(() => {						// t.throws περιμένει να λάβει συνάρτηση για 
	    throw new Error("Test failed"); 	// την οποία θα προκαλέι σφάλμα 
    });
});

const addNumbers = (a,b) => a+b;
test("Add numbers", (t) => {
    t.plan(1);				   // Λέμε στο framework ότι περιμένουμε να εκτελεστεί ΑΚΡΙΒΩΣ 1 έλεγχος.
    t.is(addNumbers(1,2), 3);  // Η 't.is' ελέγχει για αυστηρή ισότητα (===).
});

// const addNumbers = (a,b) => a + b;

// test('Add numbers', t => {
//     t.is(addNumbers(1,2), 3);
//     t.is(addNumbers(3,5), 8);
//     t.is(addNumbers(-1,2), 1);
//     t.is(addNumbers(0,0), 0);
//     t.is(addNumbers(0,2), 2);
//     t.is(addNumbers("1", "2"), "12");
//     t.is(addNumbers("1", 2), "12");
//     t.is(addNumbers(undefined, 2), NaN);
//     t.is(addNumbers(), NaN);
// });

// test('Async', async t => {
//     const res = Promise.resolve('test');
//     t.is(await res, 'test');
// });

// test.before(async (t) => {
// 	t.context.server = http.createServer(app);
//     const server = t.context.server.listen();
//     const { port } = server.address();
// 	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
// });

// test.after.always((t) => {
// 	t.context.server.close();
// });

// test("GET /api returns correct response and status code", async (t) => {
// 	const { body, statusCode } = await t.context.got("api");
// 	t.is(body.message, "It works!");
// 	t.is(statusCode, 200);
// });


const throwError = () => { throw new Error("This is an error"); };

test("Function throws an error", (t) => {
	const error =t.throws(() => throwError());
	t.is(error.message, "This is an error");
});


const fetchData = async () => "data";
test("fetchdata return data" , async t =>{
	const result  = await fetchData();
	t.is(result , "data");
} )


// endpoint test

// Βάζω πάντα πριν από όλα τα tests για να στήσω τον server.
test.before(async (t) => {
	t.context.server = http.createServer(app);		// δημιουργία του server
	const server = t.context.server.listen();		// εκκίνηση του server
	const { port } = server.address();			// λήψη της θύρας στην οποία τρέχει ο server
	t.context.got = got.extend({ 
		responseType: "json", 					//Θα κάνει αυτόματα parse τα JSON responses.
		prefixUrl: `http://localhost:${port}` 	// Βασική διεύθυνση για όλα τα αιτήματα.
	});	
});

// Χρειάζεται οπωσδήποτε άν έχω βάλει before για να κλείσω τον server μετά τα tests.
test.after.always((t) => {
	t.context.server.close();	// Κλείνουμε τον server για να τερματίσει σωστά το script
});

test("GET /api/user returns user" , async t =>{
	const {body , statusCode} = await t.context.got("api/user");		// Κάνουμε αίτημα στο endpoint /api/user
	t.is(statusCode , 200);						// Ελέγχουμε ότι ο server απάντησε με ειτυχία
	t.deepEqual(body , {user : "testuser"});	// συγκρίνουμε αντικέιμενα άρα t.deepEqual

});


test("Get /api/secret returns 401 when no auth token is provided", async (t) => {	// security check
	const error = await t.throwsAsync(() => t.context.got("api/secret"));		// t.throwsAsync γιατί περιμένουμε το request να αποτύχει
	t.is(error.response.statusCode, 401);						// Ελέγχουμε ότι ο κωδικός κατάστασης είναι 401 Unauthorized
});


// homework 


test("GET data request  on route /api/data", async t=>{		// Έλεγχος για το endpoint /api/data

	const {statusCode, body} = await t.context.got("api/data");
	t.is(statusCode, 200);
	t.deepEqual(body , [1,2,3,4,5]);		// Το t.is σε πίνακες (arrays) ελέγχει αν είναι το ίδιο αντικείμενο στη μνήμη.
    										// Το t.deepEqual ελέγχει αν έχουν τα ίδια στοιχεία (1, 2, 3, 4, 5)


});


test("Get form /api/user", async t=> {
	const error  =  await t.throwsAsync(() =>
		 t.context.got("api/user" , {
			json: { name: "" },		// στέλνουμε κενό string "" για να προκαλέσουμε το Validation Error
			responseType:"json"
		 })
		);
	t.is(error.response.statusCode , 400);
	t.truthy(error.response.body.error); // t.truthy ελέγχει απλά αν το 'error.response.body.error' υπάρχει (δεν είναι null/undefined)
});


test("PUT /api/user/1 with name : Maria" , async t => {
	const {statusCode , body} = await t.context.got.put("api/user/1" , {		//το "1" είναι το ID του χρήστη που θέλουμε να αλλάξουμε.
		json: { name: "Maria" },
		responseType:"json"
	});
	t.is(statusCode , 200);
	t.deepEqual(body , {id: "1" , name: "Maria"});	//ελέγχει ότι έμεινε ίδιο το id aλλά άλλαξε το name σε "Maria"

});

test("DELETE /api/user/1" , async t=>{
	const {statusCode, body} = await t.context.got.delete("api/user/1");	// μέθοδος delete για διαγραφή χρήστη με id 1
	t.is(statusCode , 200);
	t.deepEqual(body , {message : "User deleted"});

});


// Άσκηση 6: Έλεγχος protected endpoint με token

test("GET /api/profile with Authoization header",async t=>{
	const {statusCode , body} = await t.context.got("api/profile/attempt-auth/");
	t.is(statusCode , 200);
	t.deepEqual(body , {ok: true});
});

// Παράδειγμα από περσινή εξέταση 
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
