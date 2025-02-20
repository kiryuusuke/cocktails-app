import mongoose from "mongoose";
import {IngredientSchema} from "./Ingredient";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cocktailName: {
        type: String,
        required: true
    },
    cocktailImage: {
        type: String,
        required: true
    },
    receipt: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [IngredientSchema],
        required: true
    },
});

export const Cocktail = mongoose.model('Cocktail', CocktailSchema);