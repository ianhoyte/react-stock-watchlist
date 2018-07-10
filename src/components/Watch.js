import React, { Component } from "react";
import DisplayStocks from "./DisplayStocks";
import { db } from "../firebase";

//id.info.stocks.stock[0].stockitem

// set state function
const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

class Watch extends Component {

	constructor(props) {
		super(props);

		//TODO convert this to props, just have to rework the route path to accept them, so for now we have this...
		// extract the watchlist id from the url
		var watchlistId = /[^/]*$/.exec(document.URL)[0],
		// extract the  use id from url
		userID = /([A-Z])\w+/.exec(document.URL)[0];

		this.state = {
			stocks: [],
			existingStocks: [],
			watchlistId: watchlistId,
			userID: userID
		};
	}

	componentDidMount() {


		db.getStocks(this.state.userID, this.state.watchlistId).then(snapshot =>
			this.setState({ existingStocks: snapshot.val() })
		);


	}

	fetchStockInfo(symbol) {
		/**
		 * Seems like there's a CORS limitation on the nasdaq site and we cannot pull the data programmatically
		 *
		let request = new Request(`https://www.nasdaq.com/aspxcontent/NasdaqRSS.aspx?data=quotes&symbol=${symbol}`);

		fetch(request).then((results) => {
		  // results returns XML. lets cast this to a string, then create
		  // a new DOM object out of it!
		  results
		    .text()
		    .then(( str ) => {
		      let responseDoc = new DOMParser().parseFromString(str, 'application/json');
		      return responseDoc.getElementsByTagName('description')[0].textContent;
		    }
		    )
		  });
		  */
	}

	createStockListItem(item) {
		//TODO combine this with the existing item creation
		return (
			<li className="watch-list-item" key={item.key}>
				<h2>{item.name}</h2>
				<p>{item.description}</p>
				<span
					className="delete-me"
					onClick={() => this.delete(item.key)}
				>
					Delete
				</span>

			</li>
		);
	}

	onSubmit = event => {
		event.preventDefault();
		// const { stockSymbol } = this.state;

		if (this.stockSymbolInput.value !== "") {
			var newStockItem = {
				// set the array item value as our list item input
				stockitem: this.stockSymbolInput.value,
				
			};
		};

		this.setState(prevState => {
			return {
				stocks: prevState.stocks.concat(newStockItem)
			};
		}, function() {
			db.addStockWatchList(this.state.userID, this.state.watchlistId, this.state.stocks);
		});			


		// reset input values
		this.stockSymbolInput.value = "";

		

		//this.fetchStockInfo(stockSymbol);		

	};

	render() {

		const { existingStocks } = this.state;

		return (
			<div>
				<h1>Enter a stock symbol</h1>
				<form onSubmit={this.onSubmit}>
					<input
						ref={a => (this.stockSymbolInput = a)}
						type="text"
						placeholder="Enter Stock Symbol"
						onChange={event =>
							this.setState(
								byPropKey("stockSymbol", event.target.value)
							)
						}
					/>

					<button type="submit">ADD STOCK</button>
				</form>

				{!!existingStocks && <DisplayStocks existingStocks={existingStocks} />}
				

			</div>
		);
	}
}

export default Watch;
