export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = ({ user, password }) => (dispatch) => {
    dispatch({ type: LOGIN_IN_PROGRESS });
};
