import {createSlice} from "@reduxjs/toolkit";
import {Cocktail} from "../../../typesUI.ts";
import {deleteCocktail, getAllCocktails} from "./AdminCocktailThunk.ts";

interface IAdminCocktailsSlice {
    cocktails: Cocktail[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: IAdminCocktailsSlice = {
    cocktails: [],
    isLoading: false,
    isError: false,
}

const adminCocktailSlice = createSlice({
    name: "admin/cocktails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllCocktails.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAllCocktails.fulfilled, (state, {payload: adminCocktails}) => {
                    state.isLoading = false;
                    state.cocktails = adminCocktails;
                }
            )
            .addCase(
                getAllCocktails.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                deleteCocktail.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                deleteCocktail.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.cocktails = state.cocktails.filter((cocktail) => cocktail._id !== action.meta.arg);
                }
            )
            .addCase(
                deleteCocktail.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const adminCocktailReducer = adminCocktailSlice.reducer;