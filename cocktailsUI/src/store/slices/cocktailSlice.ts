import {createSlice} from "@reduxjs/toolkit";
import {ApiCocktail, Cocktail} from "../../typesUI.ts";
import {getPublishedCocktails} from "../thunks/cocktailThunk.ts";

interface CocktailSliceState {
    cocktails: Cocktail[];
    oneCocktail: ApiCocktail | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: CocktailSliceState = {
    cocktails: [],
    oneCocktail: null,
    isLoading: false,
    isError: false,
}

const cocktailSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getPublishedCocktails.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getPublishedCocktails.fulfilled, (state, {payload: cocktails}) => {
                    state.isLoading = false;
                    state.cocktails = cocktails
                }
            )
            .addCase(
                getPublishedCocktails.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const cocktailReducer = cocktailSlice.reducer