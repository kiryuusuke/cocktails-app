export interface User {
    _id: string
    email: string;
    role: string;
    token: string;
    googleId: string;
    displayName: string;
    userAvatar: string | null;
}


export interface RegisterResponse {
    user: User;
    message: string
}

export interface ValidationErr {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    }
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string
}

export interface RegisterUser {
    email: string;
    password: string;
    userAvatar: File | null;
    displayName: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface Cocktail {
    _id: string;
    user: User;
    cocktailName: string;
    cocktailImage: string | null;
    receipt: string;
    isPublished: boolean;
    ingredients: Ingredients[];
}

export interface CocktailMutation {
    user: string;
    cocktailName: string;
    cocktailImage: File | null;
    receipt: string;
    isPublished: boolean;
    ingredients: string;
}

export interface Ingredients {
    _id: string
    name: string;
    amount: string;
}

export type IngredientsMutation = Omit<Ingredients, '_id'>;
export type ApiCocktail = Omit<CocktailMutation, '_id'>;