import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    userRole: '',
    expireAt: null,
    scopes: []
}


const authenticationSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.Token;
            state.user = action.payload.UserInfo;
            state.userRole = action.payload.UserRole;
            state.expireAt = action.payload.ExpireAt ?? null
            state.scopes = action.payload.Scopes;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
        }
    }
});

export const AuthActions = authenticationSlice.actions
export default authenticationSlice
