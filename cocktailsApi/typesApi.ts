export interface UserTypes {
    email: string
    password: string
    token: string
    role: string
    displayName: string;
    googleId: string;
    userAvatar: string | null
}

export interface Cocktail {
    user: string;
    cocktailName: string;
    cocktailImage: string | null;
    receipt: string;
    isPublished: boolean;
    ingredients: [Ingredients];
}

export interface Ingredients {
    name: string;
    amount: string;
}