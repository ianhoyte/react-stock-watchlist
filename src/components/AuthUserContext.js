/**
 * React context Pattern to avoid prop drilling
 * @link https://www.robinwieruch.de/react-provider-pattern-context/
 */
import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;