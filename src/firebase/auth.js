/**
 * API auth interface between firebase and app
 * (official firebase endpoints for handling user registration and administration)
 *
 * @link https://www.npmjs.com/package/firebase
 */

import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();