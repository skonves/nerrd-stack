import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShortLink extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired,
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
