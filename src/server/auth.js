import uuid from 'uuid';
import jwt from 'jsonwebtoken';

const secret = 'jkhr49834hd42f3789h34989f34';

export function authMiddleware(options) {
	const allowAnon = options.allowAnon || [];
	const requireCsrfToken = options.requireCsrfToken || [];

	const allow = originalUrl => {
		for (let i = 0; i < allowAnon.length; i++) {
			const pattern = '^' + allowAnon[i] + '$';

			if (originalUrl.match(pattern)) {
				return true;
			}
		}

		return false;
	};

	const csrfRequired = originalUrl => {
		for (let i = 0; i < requireCsrfToken.length; i++) {
			const pattern = '^' + requireCsrfToken[i] + '$';

			if (originalUrl.match(pattern)) {
				return true;
			}
		}

		return false;
	};

	return function (req, res, next) {
		if (req.cookies) {
			const authToken = req.cookies.auth_token;
			const csrfToken = req.get('X-Csrf-Token');

			if (!authToken) {
				if (allow(req.originalUrl)) {
					next();
				} else {
					res.status(403).send({ message: 'missing auth_token cookie.' });
				}
			} else if (!csrfToken && csrfRequired(req.originalUrl)) {
				res.status(403).send({ message: 'missing X-Csrf-Token header.' });
			} else {
				jwt.verify(authToken, secret, function (err, decoded) {
					if (err) {
						if (allow(req.originalUrl)) {
							next();
						} else {
							res.status(403).send({ message: 'invalid auth_token cookie.' });
						}
					} else {
						if (decoded.csrfToken !== csrfToken && csrfRequired(req.originalUrl)){
							res.status(403).send({ message: 'X-Csrf-Token header does not match auth_token cookie.' });
						} else {
							req.user = decoded;
							next();
						}
					}
				});
			}
		} else {
			if (allow(req.originalUrl)) {
				next();
			} else {
				res.status(403).send({ message: 'missing auth_token cookie.' });
			}
		}
	};
}

export function addAuth(res, claims, callback) {
	claims.csrfToken = uuid();

	jwt.sign(claims, secret, { algorithm: 'HS256' }, (err, token) => {
		if (err) {
			callback(err);
		} else {
			res.cookie('auth_token', token, { httpOnly: true });
			res.cookie('csrf_token', claims.csrfToken, { httpOnly: false });
			callback();
		}
	});
}

export function clearAuth(res) {
	res.clearCookie('auth_token');
	res.clearCookie('csrf_token');
}
