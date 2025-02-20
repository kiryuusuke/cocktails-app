import express from "express";
import {Cocktail} from "../models/Cocktail";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {CocktailTypes, Ingredients} from "../typesApi";

export const cocktailRouter = express.Router();

cocktailRouter.get('/', async(_req, res, next) => {
    try {
        const cocktails = await Cocktail.find({isPublished: true});
        res.send(cocktails);
    } catch(e) {
        next(e)
    }
});

cocktailRouter.get('/:userId/mycocktails', async( req, res, next) => {
    const {userId} = req.params
    try {
        if(!userId) {
            res.status(404).send({message: 'User is not found.'});
            return
        }
            const userCocktails = await Cocktail.find({user: userId});
            res.send(userCocktails);

    } catch(e) {
        next(e)
    }
})

cocktailRouter.get('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        if(!id) {
            res.status(404).send({message: 'Current cocktail is not found!'});
           return
        }
        const oneCocktail = await Cocktail.findById(id);
        res.send(oneCocktail);
    } catch(e) {
        next(e)
    }
});

cocktailRouter.post('/', imagesUpload.single('cocktailImage'), auth, async(req, res, next) => {
    console.log('Request body:', req.body);
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const parsedIngredients = JSON.parse(req.body.ingredients);

    const newCocktail: CocktailTypes = {
        user: String(user._id),
        cocktailName: req.body.cocktailName,
        cocktailImage: req.file ? 'images/' + req.file.filename : null,
        receipt: req.body.receipt,
        isPublished: req.body.isPublished,
        ingredients: parsedIngredients,
    };
    try {
      const cocktail = new Cocktail(newCocktail);
      await cocktail.save();
      res.status(200).send(cocktail);
    } catch(e) {
        next(e)
    }
});

cocktailRouter.patch('/:cocktailId/addIngredients', auth, async(req, res, next) => {
    const {cocktailId} = req.params;
    if(!cocktailId) {
        res.status(404).send({message: 'Cocktail does not exists!'});
        return
    }

    const cocktail = await Cocktail.findById(cocktailId);

    if(!cocktail) {
        res.status(404).send({message: 'Cocktail does not exists!'});
        return
    }

    if(!req.body.name || !req.body.amount) {
        res.status(400).send({message: 'Please enter all empty fields'})
        return
    }

    const newIngredients: Ingredients = {
        name: req.body.name,
        amount: req.body.amount
    }
    try {
        cocktail.ingredients.push(newIngredients)
        await cocktail.save();
        res.status(200).send(newIngredients);
    } catch(e) {
        next(e)
    }
});