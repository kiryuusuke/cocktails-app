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