import React, { Component } from 'react';
import WatchList from './WatchList';

// protected redirect stuff
import withAuthorization from './withAuthorization';


class Home extends Component {

	render() {
		return (
			<div>
				<h1>Home</h1>
				<WatchList/>
				
			</div>
		);
	}
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);