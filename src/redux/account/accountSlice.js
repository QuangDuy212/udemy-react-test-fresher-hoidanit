import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
};


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
        },
        doLogoutAction: (state, action) => {
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }
        },
        doUpdateAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = {
                ...state.user,
                id: action.payload._id,
                email: action.payload.email,
                fullName: action.payload.fullName,
                avatar: action.payload.avatar,
            }
        }
    },
    extraReducers: (builder) => {
    },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction, doUpdateAction } = accountSlice.actions;

export default accountSlice.reducer;
