import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users:[{
  idUser: null,
  nom: "",
  email: "",
  password: "",
  type:"",
  image:""
}]
 
};

const inscripSlice = createSlice({
  name: "inscription",
  initialState,
  reducers: {
    annuler(state) {
      state = initialState;
    },

    addUser(state, action) {
      const usersLength = state.users.filter((u) => u.email=== action.payload.email).length;
      if (!usersLength) {
        state.users.push(action.payload);
      }
    },
  },
});

export const {
 
  annuler,
  addUser,
} = inscripSlice.actions;

export default inscripSlice.reducer;
