import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cocktail} from "../../typesUI.ts";
import {getOneCocktail, getPublishedCocktails} from "../thunks/cocktailThunk.ts";

interface CocktailSliceState {
    cocktails: Cocktail[];
    oneCocktail: Cocktail | null;
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
            .addCase(
                getOneCocktail.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getOneCocktail.fulfilled, (state, action: PayloadAction<Cocktail | null>) => {
                    state.isLoading = false;
                    state.oneCocktail = action.payload;
                }
            )
            .addCase(
                getOneCocktail.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const cocktailReducer = cocktailSlice.reducer