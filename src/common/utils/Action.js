export default function ({ type, payload, error, meta }) {
	this.type = type;
	this.payload = payload;
	this.error = error;
	this.meta = meta;
}
