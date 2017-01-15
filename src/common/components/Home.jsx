import React, { Component, PropTypes } from 'react';

export default class ShortLink extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		let nodes = (
			<div>
				<h1>Welcome to the NERRd stack</h1>
				To learn more, read the docs.
			</div>
		);

		return nodes;
	}
}
