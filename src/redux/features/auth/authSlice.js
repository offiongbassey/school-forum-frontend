import { createSlice } from "@reduxjs/toolkit";

const name = "";
const role = JSON.parse(localStorage.getItem("role"));
const photo = JSON.parse(localStorage.getItem("photo"));
const userName = JSON.parse(localStorage.getItem("userName"));
// const name = "Null";
const initialState ={
    isLoggedIn: false,
    name: name,
    role: role,
    photo: photo,
    userName: userName,
    user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        photo: "",
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN(state, action){
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action){
            localStorage.setItem("firstName", JSON.stringify(action.payload))
            state.firstName = action.payload
        },
        SET_USERNAME(state, action){
            localStorage.setItem("userName", JSON.stringify(action.payload))
            state.userName = action.payload
        },
        SET_ROLE(state, action){
            localStorage.setItem("role", JSON.stringify(action.payload))
            state.role = action.payload
        },
        SET_PHOTO(state, action){
            localStorage.setItem("photo", JSON.stringify(action.payload))
            state.photo = action.payload
        },
        SET_USER(state, action){
            const profile = action.payload;
            state.user.firstName = profile?.firstName;
            state.user.lastName = profile?.lastName;
            state.user.email = profile?.email;
            state.user.photo = profile?.photo;
            state.user.role = profile?.role;
        },
    },
    
});


export const {SET_LOGIN, SET_NAME, SET_ROLE, SET_USER, SET_PHOTO, SET_USERNAME} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectRole = (state) => state.auth.role;
export const selectPhoto = (state) => state.auth.photo;
export const selectUserName = (state) => state.auth.userName;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;