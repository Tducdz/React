const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, doLogin, doLogout };
