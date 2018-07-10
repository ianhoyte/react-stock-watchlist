import React, { Component } from 'react';
import { SignUpLink } from "./SignUp";

class Landing extends Component {
	render() {
		return (
			<div>
				<h1>Stock Watchlist</h1>
				<SignUpLink />
			</div>
		);
	}
}

export default Landing;