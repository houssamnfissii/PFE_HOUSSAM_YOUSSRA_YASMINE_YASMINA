import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import inscriptionReducer from "./slices/inscripSlice";
import restaurantSlice from "./slices/restaurantSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    inscription: inscriptionReducer,
    restaurant:restaurantSlice,
  
   
   
 
  },
});

export default store;
