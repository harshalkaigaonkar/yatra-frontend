import React from 'react';

const AuthContext = React.createContext(undefined);

const authReducer = (state, action) => {
	switch (action.type) {
		case 'login': {
			return {
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
			};
		}
		case 'logout': {
			return {
				accessToken: '',
				refreshToken: '',
				firstName: '',
				lastName: '',
			};
		}
	}
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(authReducer, {
		accessToken: '',
		refreshToken: '',
	});

	const value = { state, dispatch };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined)
		throw new Error('useAuth must be inside a auth-provider');
	return context;
};

export { AuthProvider, useAuth };
