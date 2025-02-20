import express from "express";
import {Cocktail} from "../../models/Cocktail";

export const adminCocktailRouter = express.Router();

adminCocktailRouter.get('/', async(_req, res, next) => {
    try {
        const cocktails = await Cocktail.find();
        res.send(cocktails);
    } catch(e) {
        next(e)
    }
});
adminCocktailRouter.delete('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        if(!id) {
            res.status(404).send({message: 'Cocktail is not found! Can not continue a process!'});
            return
        }
        await Cocktail.findOneAndDelete({_id: id});
        res.status(200).send({message: 'Cocktail has successfully deleted'});
    } catch(e) {
        next(e)
    }
})