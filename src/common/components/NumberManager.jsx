import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, loadNumber, saveNumber } from '../actions/numberActions';

class NumberManager extends Component {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	};

	render() {
		let nodes = (
			<div>
				<h1>Number Manager</h1>
				<span>the number is {this.props.number}</span>
				<button onClick={() => this.props.increment()}>increment</button>
				<button onClick={() => this.props.decrement()}>decrement</button>
				<button onClick={() => this.props.saveNumber(this.props.number)}>save</button>
				<button onClick={() => this.props.loadNumber()}>load saved</button>
				<span>{this.props.message}</span>
			</div>
		);

		return nodes;
	}
}

function mapStateToProps({ numberReducer }, ownProps) {
	return {
		number: numberReducer.number,
		message: numberReducer.message
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		increment: () => {
			dispatch(increment());
		},
		decrement: () => {
			dispatch(decrement());
		},
		loadNumber: () => {
			dispatch(loadNumber());
		},
		saveNumber: number => {
			dispatch(saveNumber(number));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberManager);
