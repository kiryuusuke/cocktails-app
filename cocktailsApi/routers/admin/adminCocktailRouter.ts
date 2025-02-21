import express from "express";
import {Cocktail} from "../../models/Cocktail";
import auth from "../../middleware/auth";

export const adminCocktailRouter = express.Router();

adminCocktailRouter.get('/', auth, async(_req, res, next) => {
    try {
        const cocktails = await Cocktail.find();
        res.send(cocktails);
    } catch(e) {
        console.log('error fetching', e)
        next(e)
    }
});

adminCocktailRouter.patch('/:id/publish', auth, async (req, res, next) => {
    const {id} = req.params;
    try {
        const cocktail = await Cocktail.findByIdAndUpdate(
            id,
            { isPublished: true },
            { new: true }
        );

        if (!cocktail) {
            res.status(404).send({ message: 'Cocktail not found' });
            return
        }

        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});


adminCocktailRouter.delete('/:id', auth, async(req, res, next) => {
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