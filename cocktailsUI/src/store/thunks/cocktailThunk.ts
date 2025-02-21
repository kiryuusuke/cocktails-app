import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, CocktailMutation} from "../../typesUI.ts";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

interface AddIngredientsPayload {
    cocktailId: string;
    ingredients: { name: string; amount: string };
}


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

export const getUsersCocktails = createAsyncThunk<Cocktail[], string>(
    'cocktails/getUsersCocktails',
    async(userId: string) => {
            const response = await axiosApi.get<Cocktail[]>(`/cocktails?userId=${userId}`);
            return response.data
    }
);

export const addNewCocktail = createAsyncThunk<void, CocktailMutation, {state: RootState}>(
    'cocktails/addNewCocktail',
    async(cocktail, {getState}) => {
        const token = getState().users.user?.token;
        const data = new FormData();

        const cocktailKeys = Object.keys(cocktail) as (keyof CocktailMutation)[];

        cocktailKeys.forEach((key) => {
            const value = cocktail[key];
            if(value !== null) {
                if(key === 'cocktailImage' && value instanceof File) {
                    data.append(key, value)
                } else if (key === 'ingredients' && Array.isArray(value)) {
                    data.append(key, JSON.stringify(value));
                } else {
                    data.append(key, String(value));
                }
            }
        });
        await axiosApi.post('/cocktails', data,
            {headers: {Authorization: token}
            });
    }
);

export const addIngredients = createAsyncThunk(
    'cocktails/addIngredients',
    async ({ cocktailId, ingredients }: AddIngredientsPayload, { getState }) => {
        const state = getState() as RootState;
        const token = state.users.user?.token;
        console.log(token)

        if (!token) {
            console.log('Token not found, please log in');
            return
        }

        try {
            const response = await axiosApi.patch(
                `/cocktails/${cocktailId}/addIngredients`,
                ingredients,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }
);