import request from 'superagent';

function login({ username }) {
	return new Promise((resolve, reject) => {
		resolve({
			username,
			avitarUri: 'https://lh4.googleusercontent.com/-5hAut0s6x7o/AAAAAAAAAAI/AAAAAAAAAAA/_guIduxL_b8/s128-c-k/photo.jpg'
		});
	});
}

function logout() {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

export default function (name, values) {
	switch (name) {
		case 'login':
			return login(values);
		case 'logout':
			return logout(values);
	}
}
