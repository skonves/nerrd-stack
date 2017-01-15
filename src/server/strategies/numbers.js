let savedNumber = -154;

function saveNumber({ number }) {
	return new Promise((resolve, reject) => {
		savedNumber = number;
		resolve();
	});
}

function loadNumber() {
	return new Promise((resolve, reject) => {
		resolve(savedNumber);
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
