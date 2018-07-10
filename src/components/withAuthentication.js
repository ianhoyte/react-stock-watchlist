/**
 * Handle session (Higher Order Component)
 * @link https://www.robinwieruch.de/gentle-introduction-higher-order-components/
 */

import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }
    render() {

		const { authUser } = this.state;

		return (
			//provider component, uses react context pattern to manage the auth'd state across the app
			<AuthUserContext.Provider value={authUser}>
				<Component />
			</AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;