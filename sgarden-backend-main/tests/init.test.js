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
    t.throws(() => {
	    throw new Error("Test failed");
    });
});

const addNumbers = (a,b) => a+b;
test("Add numbers", (t) => {
    t.plan(1);
    t.is(addNumbers(1,2), 3);
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

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

test("GET /api/user returns user" , async t =>{
	const {body , statusCode} = await t.context.got("api/user");
	t.is(statusCode , 200);
	t.deepEqual(body , {user : "testuser"});

});


test("Get /api/secret returns 401 when no auth token is provided", async (t) => {
	const error = await t.throwsAsync(() => t.context.got("api/secret"));
	t.is(error.response.statusCode, 401);
});


// homework 


test("GET data request  on route /api/data", async t=>{

	const {statusCode, body} = await t.context.got("api/data");
	t.is(statusCode, 200);
	t.deepEqual(body , [1,2,3,4,5]);


});


test("Get form /api/user", async t=> {
	const error  =  await t.throwsAsync(() =>
		 t.context.got("api/user" , {
			json: { name: "" },
			responseType:"json"
		 })
		);
	t.is(error.response.statusCode , 400);
	t.truthy(error.response.body.error);
});


test("PUT /api/user/1 with name : Maria" , async t => {
	const {statusCode , body} = await t.context.got.put("api/user/1" , {
		json: { name: "Maria" },
		responseType:"json"
	});
	t.is(statusCode , 200);
	t.deepEqual(body , {id: "1" , name: "Maria"});

});

test("DELETE /api/user/1" , async t=>{
	const {statusCode, body} = await t.context.got.delete("api/user/1");
	t.is(statusCode , 200);
	t.deepEqual(body , {message : "User deleted"});

});


// Άσκηση 6: Έλεγχος protected endpoint με token

test("GET /api/profile with Authoization header",async t=>{
	const {statusCode , body} = await t.context.got("api/profile/attempt-auth/");
	t.is(statusCode , 200);
	t.deepEqual(body , {ok: true});
});