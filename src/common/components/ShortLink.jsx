import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShortLink extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired,
	};

	render() {
		let nodes = (
			<div>
				<h1>its a short link</h1>
				<div>{this.props.params.value}</div>
			</div>
		);

		return nodes;
	}
}
