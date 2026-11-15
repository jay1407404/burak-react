import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";
import { HomeRepairServiceSharp } from "@mui/icons-material";

const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: [],
}

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setnewDishes: (state, action) => {
            state.newDishes = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
})

export const { setPopularDishes, setnewDishes, setTopUsers } =
    homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;