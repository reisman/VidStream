import { LOGIN_FAILED, LOGIN_IN_PROGRESS, LOGIN_SUCCESS } from './LoginActions';

const initialState = {
    isAuthenticated: false,
    isAuthenticationInProgress: false,
    token: null,
    user: null,
};

const LoginState = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_IN_PROGRESS:
            return {
                isAuthenticated: true,
                isAuthenticationInProgress: true,
                token: action.token,
                user: action.user,
            };
        case LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                isAuthenticationInProgress: false,
                token: action.token,
                user: action.user,
            };
        case LOGIN_FAILED:
            return {
                isAuthenticated: false,
                isAuthenticationInProgress: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default LoginState;
