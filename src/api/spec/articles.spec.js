/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = (path) => `http://localhost:3000${path}`;

describe('Validate Article functionality', () => {
	// // login a test user so auth is set
	// async function beforeAll() {
	// 	let loginUser = { username: 'TestUser', password: 'TestPassword' };
	// 	await fetch(url('/login'), {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify(loginUser),
	// 	});
	// }

	// // logout the user after the tests
	// async function afterAll() {
	// 	await fetch(url('/logout'), {
	// 		method: 'PUT',
	// 	});
	// }

	// beforeAll();

	it('should give me three or more articles', (done) => {
		fetch(url('/articles'), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.catch((error) => console.log(error.message))
			.then((res) => res.json())
			.then((res) => {
				if (res instanceof Array) expect(res.length).toBeGreaterThan(2);
				done();
			});
	});

	it('should add new article with successive article id, return list of articles with new article', (done) => {
		// add a new article
		// verify you get the articles back with new article
		// verify the id, author, content of the new article
		let post = { author: 'Tom', body: 'A new post' };

		try {
			fetch(url('/article'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(post),
			})
				.catch((error) => console.log(error.message))
				.then((res) => res.json())
				.then((res) => {
					if (res instanceof Array) {
						// test new article expected id, author, post
						expect(res[res.length - 1].id).toBe(res.length - 1);
						expect(res[res.length - 1].author).toBe('Tom');
						expect(res[res.length - 1].body).toBe('A new post');
					}
					done();
				});
		} catch (error) {
			console.log(error.message);
		}
	});

	it('should return an article with a specified id', (done) => {
		try {
			//call GET /articles/id with the chosen id
			fetch(url('/articles/1'), {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
				// validate that the correct article is returned
				// test article expected id, author, post
				.catch((error) => console.log(error.message))
				.then((res) => res.json())
				.then((res) => {
					// test new article expected id, author, post
					expect(res.id).toBe(1);
					expect(res.author).toBe('Jack');
					expect(res.body).toBe('Post 2');
					done();
				});
		} catch (error) {
			console.log(error.message);
		}
	});

	// afterAll();
});
