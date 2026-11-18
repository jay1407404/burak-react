import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from ".";

const selectHomepage = (state: AppRootState) => state.homePage;

export const retrivePopularDishes = createSelector(selectHomepage,
    (HomePage) => HomePage.popularDishes
);

export const retriveNewDishes = createSelector(selectHomepage,
    (HomePage) => HomePage.newDishes
);

export const retriveTopUsers = createSelector(selectHomepage,
    (HomePage) => HomePage.topUsers
);
