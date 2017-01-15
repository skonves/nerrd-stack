import express from 'express';

import { addAuth, clearAuth } from './auth';
import { getRepository } from '../common/utils/repository';

const app = express();

app.post('/login', (req, res) => {
	const { username } = req.body;
	getRepository()
		.auth('login', { username })
		.then(value => {
			const claims = {
				username,
				avatarUri: 'https://avatars.githubusercontent.com/u/4925067?size=100'
			};
			addAuth(res, claims, err => {
				if (err) {
					res.status(500).send({ err });
				} else {
					res.status(200).send(claims);
				}
			});
		})
		.catch(reason => {
			res.status(500).send({ reason });
		});
});

app.post('/logout', (req, res) => {
	const { username } = req.body;
	getRepository()
		.auth('logout', { username })
		.then(value => {
			setTimeout(() => {
				clearAuth(res);
				res.status(200).send(value);
			}, 750);
		})
		.catch(reason => {
			res.status(500).send({ reason });
		});
});

app.get('/number', (req, res) => {
	getRepository()
		.numbers('load')
		.then(value => {
			setTimeout(() => {
				res.send({ number: value });
			}, 750);
		})
		.catch(reason => {
			res.status(500).send({ reason });
		});
});

app.put('/number', (req, res) => {
	const number = req.body.number;
	getRepository()
		.numbers('save', { number })
		.then(value => {
			setTimeout(() => {
				res.sendStatus(204);
			}, 750);
		})
		.catch(reason => {
			res.status(500).send({ reason });
		});
});

export default app;
