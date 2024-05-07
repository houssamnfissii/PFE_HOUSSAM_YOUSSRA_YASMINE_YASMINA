import { createSlice } from "@reduxjs/toolkit";

const users = [
  {
    idUser: 3,
  name: "mhrad",
  email: "mhrad@vg.com",
  password: "555999",
  type:"admin",
  image:"htt//"
  },
  {
    idUser: 4,
    name: "hind",
    email: "hind@vg.com",
    password: "124577",
    type:"admin",
    image:"htt//"
   
  },
];

const initialState = {
  users: users,
  user: {},
  status: "logout",
  isAuthenticated: false,

 
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: {
      prepare(email,password) {
        return {
          payload: {email,password },
        };
      },
      reducer(state, action) {
        const user = state.users.find(
          (u) =>
            u.email === action.payload.email && u.password === action.payload.password
        );
        if (user) {
          state.user = user;
          state.role = user.role;
          state.isAuthenticated = true;
          state.status = "valid";
        }
        return state;
      },
    },
    logout(state) {
      state.status = "logout";
      state.isAuthenticated = false;
      state.role = "";
    },
   
    
   
    
  }
});

export const { login, logout} = loginSlice.actions;

export default loginSlice.reducer;
