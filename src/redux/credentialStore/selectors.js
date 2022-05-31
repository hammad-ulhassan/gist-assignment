export const selectToken = (state) => state.logins.token;
export const selectUsername = (state) => state.logins.username;
export const selectIsLoggedIn = (state) => state.logins.loggedIn;
export const selectLoggedTime = (state) => state.logins.loginTime;
export const selectAuthUserData = (state)=>state.logins.authUserData;