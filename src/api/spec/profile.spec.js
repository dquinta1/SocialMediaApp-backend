/*
 * Test suite for profile
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = (path) => `http://localhost:3000${path}`;

describe('Validate Profile functionality', () => {
	// TODO: configure setup and cleanup

	it('should give me headline of loggedInUser', (done) => {
		fetch(url('/headline'), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.catch((error) => console.log(error.message))
			.then((res) => res.json())
			.then((res) => {
				expect(res).toBe('Test Headline');
				done();
			});
	});

	it('should update headline of loggedInUser to a new headline', (done) => {
		fetch(url('/headline'), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: { headline: 'New Headline' },
		})
			.catch((error) => console.log(error.message))
			.then((res) => res.json())
			.then((res) => {
				expect(res).toBe('New Headline');
				done();
			});
	});
});
