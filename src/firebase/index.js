/**
 * Expose firebase functionalities to other modules
 */

import * as auth from './auth';
import * as db from './db';
import * as firebase from './firebase';

export {
	db,
	auth,
	firebase,
};