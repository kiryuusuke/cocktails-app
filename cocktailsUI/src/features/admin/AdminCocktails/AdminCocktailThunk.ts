import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail} from "../../../typesUI.ts";
import axiosApi from "../../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const getAllCocktails = createAsyncThunk<Cocktail[], void>(
    'admin/cocktails/getAllCocktails',
    async() => {
        const response = await axiosApi.get<Cocktail[]>('/admin/cocktails');
        return response.data || [];
    }
);

export const deleteCocktail = createAsyncThunk<void, string, { state: RootState }>(
    'admin/cocktails/deleteCocktail',
    async(cocktailId, { getState }) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.delete(`/admin/cocktails/${cocktailId}`,
                {headers: {Authorization: `Bearer ${token}`}
                });
        } catch(e) {
            console.error(e);
        }
    }
)