import React, { Component } from "react";
import WatchListItems from "./WatchListItems";
import { db, firebase, } from '../firebase';

class WatchList extends Component {

	constructor(props) {
		super(props);

		// define our items array state
		this.state = {
			items: [],
			uid: firebase.auth.currentUser.uid,
			existingItems: ''
		};

		// bind to functions
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.deleteExistingItem = this.deleteExistingItem.bind(this);
	}

	componentDidMount() {

		db.getWatchLists(this.state.uid).then(snapshot =>
			this.setState({ existingItems: snapshot.val() })
		);
	}

	addItem(e) {


		e.preventDefault();

		// only concatenate states if input element isn't empty
		if (this.nameInput.value !== "") {
			var newItem = {
				// set the array item value as our list item input
				name: this.nameInput.value,
				description: this.descriptionInput.value,
				// set a unique key for our array item
				key: 'watch-list-' + Date.now()
			};

			// combine previous state and new item to create newest items state
			this.setState(prevState => {
				return {
					items: prevState.items.concat(newItem)
				};
			}, function() {
				// add the watchlist to the firebase DB in the callback
		    	db.doCreateWatchList(this.state.uid, newItem.key, newItem.name, newItem.description, '');
			});


			// reset input values
			this.nameInput.value = "";
			this.descriptionInput.value = "";
		}

		
	}

	deleteItem(key) {
		/**
		 * Filter out the key from the current items state
		 */
		var filteredItems = this.state.items.filter(function (item) {
			return (item.key !== key);
		});

		// set the item state with the new array
		this.setState({
			items: filteredItems
		}, function() {
			// Delete the firebase entry, identified by key, in callback
	    	db.doDeleteWatchList(this.state.uid, key);
		});
	}
	deleteExistingItem(key) {

		/**
		 * this one is different because firebase returns an object
		 * while the list state creates an array... 
		 */

		const { existingItems } = this.state;

		delete this.state.existingItems[key]

		// set the item state with the new array
		this.setState({
			existingItems: this.state.existingItems
		}, function() {
			// Delete the firebase entry, identified by key, in callback
	    	db.doDeleteWatchList(this.state.uid, key);
		});
	}

	render() {
		// expose existingitems state
	    const { existingItems } = this.state;

		return (
			<div className="todoListMain">
				<div className="header">
					<h1>Create a watchlist {this.state.user}</h1>
					<form onSubmit={this.addItem}>
						<input
							ref={a => (this.nameInput = a)}
							placeholder="Name" />
						<textarea
							ref={b => (this.descriptionInput = b)}
							placeholder="Description">
						</textarea>
						<button type="submit">add</button>
					</form>
				</div>

		        <WatchListItems
    				userid={this.state.uid}
    				existingItems={this.state.existingItems} 
					newitem={this.state.items}
					delete={this.deleteItem}
					deleteExisting={this.deleteExistingItem}/>

			</div>
		);	
	}
}


export default WatchList;
