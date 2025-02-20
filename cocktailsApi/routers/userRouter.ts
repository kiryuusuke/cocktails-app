import express from "express";
import User from "../models/User";
import { Error } from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import {imagesUpload} from "../multer";

const client = new OAuth2Client(config.google.clientId);

export const userRouter = express.Router();

userRouter.post('/google', async(req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId
        });

        const payload = ticket.getPayload();

        if(!payload) {
            res.status(400).send({error: 'Invalid credential! Login Error'});
            return
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const userAvatar = payload.picture

        if(!email) {
            res.status(400).send({error: 'Invalid user data to continue login'});
            return
        }

        let user = await User.findOne({googleId: id});

        if(!user) {
            user = new User({
                email: email,
                password: crypto.randomUUID(),
                googleId: id,
                displayName,
                userAvatar: userAvatar
            })
        }

        user.generateToken();
        await user.save();
        res.send({message: 'Login by Google account successfully passed', user});
    } catch(e) {
        next(e)
    }
})



userRouter.post('/register', imagesUpload.single('userAvatar'), async (req, res, next) => {
    try {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            userAvatar: req.file ? 'images/' + req.file.filename : null
        });

        newUser.generateToken();

        await newUser.save();
        res.send({newUser, message: 'Registration success'});
        return;
    } catch(e) {
        if (e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return
        }
        return next(e);
    }
});

userRouter.post('/sessions', async (req, res) => {
    const existsUser = await User.findOne({email: req.body.email});

    if(!existsUser) {
        res.status(400).send({error: 'User is not found'})
        return
    }

    const matchPasswords = await existsUser.passwordCheckout(req.body.password);

    if(!matchPasswords) {
        res.status(400).send({error: 'Password is wrong'});
        return
    }

    existsUser.generateToken();
    await existsUser.save();

    res.send({message: 'User and password correct', user: existsUser});
    return
});

userRouter.delete('/sessions', auth, async(req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const existsUser = await User.findOne({_id: user._id});
        if(existsUser) {
            existsUser.generateToken();
            await existsUser.save();
            res.send({message: 'Logout successfully done'});
        }
    } catch(e) {
        next(e)
    }
});

userRouter.post('/secret', auth, async(req, res) => {
    let expressReq = req as RequestWithUser;

    const user = expressReq.user;

    console.log(user);
    res.send({
        email: user.email,
        message: "Nothing there :)"
    });
    return
});