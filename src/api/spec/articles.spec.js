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

	it('login user', (done) => {
		let loginUser = { username: 'TestUser', password: 'TestPassword' };
		fetch(url('/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(loginUser),
		})
			.catch((error) => console.log(error.message))
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				expect(res.username).toEqual('TestUser');
				expect(res.result).toEqual('success');
				done();
			});
	});

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
		let post = {
			title: 'New Article',
			body: 'lorem ipsum something something'
		};

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
						expect(res[res.length - 1].pid).toBe('619058b39597cfb838b5b5ba');
						expect(res[res.length - 1].author).toBe('TestUser');
						expect(res[res.length - 1].title).toBe('New Article');
						expect(res[res.length - 1].description).toBe(
							'lorem ipsum something something'
						);
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
			fetch(url('/articles/61918a89c57e0fd719810d35'), {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
				// validate that the correct article is returned
				// test article expected id, author, post
				.catch((error) => console.log(error.message))
				.then((res) => res.json())
				.then((res) => {
					// test new article expected id, author, post
					expect(res._id).toBe('61918a89c57e0fd719810d35');
					expect(res.pid).toBe('619058b39597cfb838b5b5ba');
					expect(res.author).toBe('TestUser');
					expect(res.title).toBe('Article Created by TestUser');
					expect(res.description).toBe('lorem ipsum something TEST');
					done();
				});
		} catch (error) {
			console.log(error.message);
		}
	});

	// afterAll();
});
