import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../firebase";
import * as routes from "../constants/routes";

const SignUpPage = ({ history }) => (
	<div>
		<h1>SignUp</h1>
		<SignUpForm history={history} />
	</div>
);

// setup initial state for state management
const INITIAL_STATE = {
	username: "",
	email: "",
	passwordOne: "",
	passwordTwo: "",
	error: null
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		// set state to intiail state constant
		this.state = { ...INITIAL_STATE };
	}

	/**
	 * Submit form event, checks for matching password
	 */
	onSubmit = event => {
		// expose signup info to for event state
		const { username, email, passwordOne } = this.state;

		// expose history object
		const { history } = this.props;

		// firebase API function, create user
		auth
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				// create a user in firebase DB
				db
					.doCreateUser(authUser.user.uid, username, email)
					.then(() => {
						//reset intial state
						this.setState(() => ({ ...INITIAL_STATE }));
						// redirect to HOME route on successful signup/signin
						history.push(routes.HOME);
					})
					.catch(error => {
						// throw an error (handled by firebase)
						this.setState(byPropKey("error", error));
					});
			})
			.catch(error => {
				this.setState(byPropKey("error", error));
			});

		event.preventDefault();
	};

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;

		// form validation
		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			username === "";

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={username}
					onChange={event =>
						this.setState(byPropKey("username", event.target.value))
					}
					type="text"
					placeholder="Full Name"
				/>

				<input
					value={email}
					onChange={event =>
						this.setState(byPropKey("email", event.target.value))
					}
					type="text"
					placeholder="Email Address"
				/>

				<input
					value={passwordOne}
					onChange={event =>
						this.setState(
							byPropKey("passwordOne", event.target.value)
						)
					}
					type="password"
					placeholder="Password"
				/>

				<input
					value={passwordTwo}
					onChange={event =>
						this.setState(
							byPropKey("passwordTwo", event.target.value)
						)
					}
					type="password"
					placeholder="Confirm Password"
				/>

				<button disabled={isInvalid} type="submit">
					Sign Up
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignUpLink = () => (
	<p>
		Need an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
	</p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
