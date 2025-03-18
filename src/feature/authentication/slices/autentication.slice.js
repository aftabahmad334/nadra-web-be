import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
}


const authenticationSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
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
