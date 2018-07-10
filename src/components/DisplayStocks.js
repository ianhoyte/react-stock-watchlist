import React, { Component } from 'react';

class DisplayStocks extends Component {
	render() {

		return (

			<div>
				{
					Object.keys(this.props.existingStocks).map(key => (
						<li>{this.props.existingStocks[key].stockitem}</li>
					))
				}
			</div>
		);
	}
}

export default DisplayStocks;