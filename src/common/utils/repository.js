let repository = {};

export function createRepository(strategies) {
	if (typeof (strategies) === 'function' && strategies.length === 2) {
		repository = strategies;
	} else {
		repository = {};
		Object.keys(strategies).forEach(key => {
			const strategy = strategies[key];

			if (typeof (strategy) === 'function' && strategy.length === 2) {
				repository[key] = strategy;
			}
		});
	}
}

export function getRepository() {
	return repository;
}
