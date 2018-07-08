import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { routerActions } from 'connected-react-router';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.user.data !== null,
    authenticatingSelector: state => state.user.isLoading,
    wrapperDisplayName: 'UserIsAuthenticated',
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    authenticatedSelector: state => state.LoginState.isAuthenticated,
    authenticatingSelector: state => state.LoginState.isAuthenticationInProgress,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectAction: routerActions.replace,
    redirectPath: '/login',
});

export const userIsAdminRedir = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.LoginState.isAuthenticated && state.user.data.isAdmin,
    predicate: user => user.isAdmin,
    wrapperDisplayName: 'UserIsAdmin',
});

const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => !state.LoginState.isAuthenticated && !state.LoginState.isAuthenticationInProgress,
    wrapperDisplayName: 'UserIsNotAuthenticated',
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    authenticatedSelector: state => state.LoginState.isAuthenticated,
    authenticatingSelector: state => state.LoginState.isAuthenticationInProgress,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/protected',
    allowRedirectBack: false,
});
