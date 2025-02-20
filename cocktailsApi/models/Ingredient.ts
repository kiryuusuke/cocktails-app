import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
});
