import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import {adminCocktailRouter} from "./adminCocktailRouter";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/cocktails', adminCocktailRouter);

export default adminRouter