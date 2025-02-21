import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cocktail, Ingredients} from "../../typesUI.ts";
import {
    addIngredients,
    addNewCocktail,
    getOneCocktail,
    getPublishedCocktails,
    getUsersCocktails
} from "../thunks/cocktailThunk.ts";

interface CocktailSliceState {
    cocktails: Cocktail[];
    oneCocktail: Cocktail | null;
    ingredients: Ingredients[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: CocktailSliceState = {
    cocktails: [],
    oneCocktail: null,
    ingredients: [],
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
            .addCase(
                getUsersCocktails.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getUsersCocktails.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.cocktails = action.payload
                }
            )
            .addCase(
                getUsersCocktails.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                addNewCocktail.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                addNewCocktail.fulfilled, (state) => {
                    state.isLoading = true;
                }
            )
            .addCase(
                addNewCocktail.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(addIngredients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addIngredients.fulfilled, (state, action: PayloadAction<Ingredients>) => {
                state.isLoading = false;
                state.ingredients.push(action.payload);
            })
            .addCase(addIngredients.rejected, (state) => {
                state.isLoading = false;
                state.isError = true
            });
    }
});

export const cocktailReducer = cocktailSlice.reducer