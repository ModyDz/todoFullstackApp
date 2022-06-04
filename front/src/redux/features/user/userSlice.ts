import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types";

const localUser = localStorage.getItem("user") as string;
const initialState: IUser = JSON.parse(localUser) || null;
export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: (state: any) => {
      localStorage.removeItem("user");
      return (state = initialState);
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (state = action.payload);
    },
    updatePicture: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (state = action.payload);
    },
  },
});
export default userSlice.reducer;

export const { logout, setUser, updatePicture } = userSlice.actions;
