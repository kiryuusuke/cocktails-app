import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail} from "../../../typesUI.ts";
import axiosApi from "../../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const getAllCocktails = createAsyncThunk<Cocktail[], void, {state: RootState}>(
    'admin/cocktails/getAllCocktails',
    async(_, {getState}) => {
        const token = getState().users.user?.token;
        const response = await axiosApi.get<Cocktail[]>('/admin/cocktails',{
            headers: {Authorization: token}
        });
        return response.data || [];
    }
);

export const publishCocktail = createAsyncThunk<Cocktail, string, {state: RootState}>(
    'admin/publishCocktail',
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        console.log('Token:', token);
        const response = await axiosApi.patch<Cocktail>(`/admin/cocktails/${id}/publish`, {}, {
            headers: {Authorization: token}
        });
       return response.data;
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