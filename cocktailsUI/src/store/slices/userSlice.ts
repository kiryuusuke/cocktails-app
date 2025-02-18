import {createSlice} from "@reduxjs/toolkit";
import {GlobalError, User, ValidationErr} from "../../typesUI.ts";
import {googleLogin, login, register} from "../thunks/userThunk.ts";


interface UserProps {
    user: User | null;
    isLoading: boolean;
    registerError: ValidationErr | null
    loginError: GlobalError | null
}

const initialState: UserProps = {
    user: null,
    isLoading: false,
    registerError: null,
    loginError: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                register.pending, (state) => {
                    state.isLoading = true;
                    state.registerError = null
                }
            )
            .addCase(
                register.fulfilled, (state, {payload: registerResponse}) => {
                    state.isLoading = false;
                    state.user = registerResponse.user;
                }
            )
            .addCase(
                register.rejected, (state, {payload: err}) => {
                    state.isLoading = false;
                    state.registerError = err || null;
                }
            )
            .addCase(
                login.pending, (state) => {
                    state.isLoading = true;
                    state.loginError = null
                }
            )
            .addCase(
                login.fulfilled, (state, {payload: user}) => {
                    state.isLoading = false;
                    state.user = user;
                }
            )
            .addCase(
                login.rejected, (state, {payload: err}) => {
                    state.isLoading = false;
                    state.loginError = err || null;
                }
            )
            .addCase(
                googleLogin.pending, (state) => {
                    state.isLoading = true;
                    state.loginError = null
                }
            )
            .addCase(
                googleLogin.fulfilled, (state, {payload: user}) => {
                    state.isLoading = false;
                    state.user = user;
                }
            )
            .addCase(
                googleLogin.rejected, (state, {payload: err}) => {
                    state.isLoading = false;
                    state.loginError = err || null;
                }
            )
    }
});

export const userReducer = userSlice.reducer
export const {logoutUser} = userSlice.actions;