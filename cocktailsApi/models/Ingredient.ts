import mongoose from "mongoose";

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
});

export const Ingredient = mongoose.model('Ingredient', IngredientSchema);