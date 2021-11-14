/*
 * Test suite for login/registration
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
const User = require('../models/User');

const url = (path) => `http://localhost:3000${path}`;

describe('Validate Registration and Login functionality', () => {
	// async function afterAll(){
	// 	try {
	// 		await User.findOneAndDelete({ username: 'mrj3' });
	// 	} catch (error) {
	// 		console.log(error.message);
	// 		throw error;
	// 	}
	// };

	it('register new user', (done) => {
		let regUser = {
			username: 'mrj3',
			password: '1234',
			headline: 'Web Dev Rocks!',
			email: 'mj@rice.edu',
			zipcode: '77005',
			dob: '128999122000',
		};
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
			.catch((error) => console.log(error.message))
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				expect(res.username).toEqual('mrj3');
				expect(res.result).toEqual('success');
				done();
			});
	});

	it('logout user', (done) => {
		fetch(url('/logout'), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
		})
			.catch((error) => console.log(error.message))
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				expect(res.result).toEqual('success');
				done();
			});
	});

	// afterAll();
});
