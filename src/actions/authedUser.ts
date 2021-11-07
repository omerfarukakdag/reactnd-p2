export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setAuthedUser = (id: string) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
