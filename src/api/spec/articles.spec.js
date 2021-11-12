/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = (path) => `http://localhost:3000${path}`;
let cookie;

describe('Validate Registration and Login functionality', () => {
	it('register new user', (done) => {
		let regUser = { username: 'mrj3', password: '1234' };
		fetch(url('/register'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(regUser),
		})
			.then((res) => res.json())
			.then((res) => {
				expect(res.username).toEqual('mrj3');
				expect(res.result).toEqual('success');
				done();
			});
	});

	it('login user', (done) => {
		let loginUser = { username: 'mrj3', password: '1234' };
		fetch(url('/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(loginUser),
		})
			.then((res) => {
				cookie = res.headers.get('set-cookie');
				//console.log('cookie is', cookie);
				return res.json();
			})
			.then((res) => {
				expect(res.username).toEqual('mrj3');
				expect(res.result).toEqual('success');
				done();
			});
	});
});

describe('Validate Article functionality', () => {
	it('should give me three or more articles', (done) => {
		fetch(url('/articles'), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', cookie: cookie },
		})
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
		fetch(url('/article'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', cookie: cookie },
			body: JSON.stringify(post),
		})
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
	});

	it('should return an article with a specified id', (done) => {
		//call GET /articles/id with the chosen id
		fetch(url('/articles/1'), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', cookie: cookie },
		})
			// validate that the correct article is returned
			// test article expected id, author, post
			.then((res) => res.json())
			.then((res) => {
				// test new article expected id, author, post
				expect(res.id).toBe(1);
				expect(res.author).toBe('Jack');
				expect(res.body).toBe('Post 2');
				done();
			});
	});
});
