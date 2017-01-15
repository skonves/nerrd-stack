import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Login from './auth/login';

export default class TodoApp extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<Login />
				<nav>
					<ul>
						<li><Link to="/" activeStyle={{ color: 'red' }}>Home</Link></li>
						<li><Link to="/numbers" activeStyle={{ color: 'red' }}>Number Manager</Link></li>
						<li><Link to="/links" activeStyle={{ color: 'red' }}>Url Shortener</Link></li>
					</ul>
				</nav>
				<section>
					{this.props.children}
				</section>
			</div>
		);
	}
}
