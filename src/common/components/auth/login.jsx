import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';

class Login extends Component {
	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	handleLogin(e) {
		this.state = this.state || {};
		this.props.login(this.state.username, this.state.password);
		this.state = {};
		e.preventDefault();
	}

	handleLogout() {
		this.props.logout();
	}

	handleUsernameChange(e) {
		this.state = this.state || {};
		this.state.username = e.target.value;
		e.preventDefault();
	}

	handlePasswordChange(e) {
		this.state = this.state || {};
		this.state.password = e.target.password;
		e.preventDefault();
	}

	render() {
		const { username, avatarUri, login, isAuthenticated } = this.props;
		return (
			<div>
				{isAuthenticated ?
					(<div>
						<img src={avatarUri} alt={username} />
						<span>{username}</span>
						<button onClick={() => this.handleLogout()}>Logout</button>
					</div>) :
					(<form onSubmit={e => this.handleLogin(e)}>
						<input
							type="text"
							name="username"
							placeholder="username"
							onChange={e => this.handleUsernameChange(e)} />
						<input
							type="password"
							name="password"
							placeholder="password"
							onChange={e => this.handlePasswordChange(e)} />
						<input type="submit" value="Login" />
					</form>)}
			</div>
		);
	}
}

function mapStateToProps({ auth }, ownProps) {
	return {
		username: auth.username || 'asdfasdf',
		avatarUri: auth.avatarUri,
		isWorking: auth.isLoggingIn || auth.isLoggingOut,
		isAuthenticated: auth.isAuthenticated,
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		login: username => {
			dispatch(login({ username }));
		},
		logout: () => {
			dispatch(logout());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
