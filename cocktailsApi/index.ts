import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import mongoDb from "./mongoDb";
import {userRouter} from "./routers/userRouter";
import adminRouter from "./routers/admin";
import {cocktailRouter} from "./routers/cocktailRouter";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/cocktails', cocktailRouter);

const run = async() => {
    await mongoose.connect('mongodb://localhost/cocktails');

    app.listen(port, () => {
        console.log(`Server running on port: http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    })
};

run().catch(err => console.error(err));