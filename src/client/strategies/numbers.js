import request from '../request';

function getCsrfToken() {
	return getCookie('csrf_token');
}

function getCookie(name) {
	var value = '; ' + document.cookie;
	var parts = value.split('; ' + name + '=');
	if (parts.length == 2) {
		return parts.pop().split(';').shift();
	}
}

function saveNumber({ number }) {
	return new Promise((resolve, reject) => {
		request
			.put('/api/number')
			.send({ number })
			.end((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
	});
}

function loadNumber() {
	return new Promise((resolve, reject) => {
		request
			.get('/api/number')
			.end((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res.body.number);
				}
			});
	});
}

export default function (name, values) {
	switch (name) {
		case 'save':
			return saveNumber(values);
		case 'load':
			return loadNumber(values);
	}
}
