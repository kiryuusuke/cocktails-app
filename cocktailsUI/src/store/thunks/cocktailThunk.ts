import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail} from "../../typesUI.ts";
import axiosApi from "../../axiosApi.ts";

export const getPublishedCocktails = createAsyncThunk<Cocktail[], void>(
    'cocktails/getPublishedCocktails',
    async() => {
        const response = await axiosApi.get('/cocktails');
        return response.data || []
    }
);

export const getOneCocktail = createAsyncThunk<Cocktail | null, string>(
    'cocktails/getOneCocktail',
    async(cocktailId) => {
        const response = await axiosApi.get<Cocktail | null>(`/cocktails/${cocktailId}`);
        if(!response.data) return null;
        return response.data;
    }
);
