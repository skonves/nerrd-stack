import React, { Component, PropTypes } from 'react';

export default class ShortLink extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
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
