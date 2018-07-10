import React, { Component } from "react";

import { Link } from "react-router-dom";

class WatchListItems extends Component {
	constructor(props) {
		super(props);

		this.createWatchListItem = this.createWatchListItem.bind(this);
	}

	createWatchListItem(item) {
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
				<Link
					className="watchlist-link"
					to={"/watchlist/" + this.props.userid +'/' + item.key}
				>
					Add Stocks
				</Link>
			</li>
		);
	}

	delete(key) {
		this.props.delete(key);
	}
	deleteExisting(key) {
		this.props.deleteExisting(key);
	}

	render() {

		let renderItem = this.props.newitem,
			listItems = renderItem.map(this.createWatchListItem),
			existingItems = this.props.existingItems;

		return (
			<ul className="watch-list">
				{Object.keys(existingItems).map(key => (
					<li className="watch-list-item" key={key}>
						<h2>{existingItems[key].info.name}</h2>
						<p>{existingItems[key].info.description}</p>
						<span
							className="delete"
							onClick={() => this.deleteExisting(key)}
						>
							Delete
						</span>
						<Link
							className="watchlist-link"
							to={"/watch-list/" + this.props.userid +'/' + key}
						>
							Add Stocks
						</Link>
					</li>
				))}
				{listItems}
			</ul>
		);
	}
}

export default WatchListItems;
