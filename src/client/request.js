import request from 'superagent';

function getCookie(name) {
	var value = '; ' + document.cookie;
	var parts = value.split('; ' + name + '=');
	if (parts.length == 2) {
		return parts.pop().split(';').shift();
	}
}

export default {
	get: uri => {
		const token = getCookie('csrf_token');
		return token ? request.get(uri).set('X-Csrf-Token', token) : request.get(uri);
	},
	post: uri => {
		const token = getCookie('csrf_token');
		return token ? request.post(uri).set('X-Csrf-Token', token) : request.post(uri);
	},
	put: uri => {
		const token = getCookie('csrf_token');
		return token ? request.put(uri).set('X-Csrf-Token', token) : request.put(uri);
	},
	head: uri => {
		const token = getCookie('csrf_token');
		return token ? request.head(uri).set('X-Csrf-Token', token) : request.head(uri);
	},
	del: uri => {
		const token = getCookie('csrf_token');
		return token ? request.del(uri).set('X-Csrf-Token', token) : request.del(uri);
	},
	trace: uri => {
		const token = getCookie('csrf_token');
		return token ? request.trace(uri).set('X-Csrf-Token', token) : request.trace(uri);
	},
	connect: uri => {
		const token = getCookie('csrf_token');
		return token ? request.connect(uri).set('X-Csrf-Token', token) : request.connect(uri);
	},
};
