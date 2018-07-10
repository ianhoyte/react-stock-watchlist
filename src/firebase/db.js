import { db } from "./firebase";

// User API
export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
		username,
		email
	});

// Return all users
export const getWatchLists = (uid) => db.ref(`users/${uid}/watchlists`).once("value");

// Create a watchlist
export const doCreateWatchList = (uid, watchlistID, name, description, stocks) =>
	db.ref(`users/${uid}/watchlists/${watchlistID}/info/`).set({
		name,
		description,
		stocks
	});

// deletes a wathlist
export const doDeleteWatchList = (uid, watchlistID) =>
	db.ref(`users/${uid}/watchlists/${watchlistID}`).remove();

// adds a stock to the watchlist
export const addStockWatchList = (uid, watchlistID, stock) =>
	db.ref(`users/${uid}/watchlists/${watchlistID}/info/stocks/`).set({
		stock
	});
//removes the stock from the watchlist
export const removeStockWatchList = (uid, watchlistID, stock) =>
	db.ref(`users/${uid}/watchlists/${watchlistID}/stocks/${stock}`).remove();

// gets all the stocks associated with a watchlist
export const getStocks = (uid, watchlistID) => db.ref(`users/${uid}/watchlists/${watchlistID}/info/stocks/stock/`).once("value");


//id.info.stocks.stock[0].stockitem