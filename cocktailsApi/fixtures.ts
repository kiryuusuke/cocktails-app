import mongoose from "mongoose";
import config from "./config";
import {Cocktail} from "./models/Cocktail";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async() => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('cocktails');
        await db.dropCollection('users');
    } catch(e) {
        console.log('Collections were not presents, skipping drop');
    }

    const [Marsel, John] = await User.create(
        {
            email: 'msugurbekov@mail.com',
            displayName: 'Marsel',
            userAvatar: 'fixtures/170088022.jpeg',
            password: '8686',
            token: randomUUID(),
            role: 'admin'
        },
        {
            email: 'ryushimaa@gmail.com',
            displayName: 'John',
            userAvatar: 'fixtures/John.png',
            password: '6868',
            token: randomUUID(),
            role: 'user'
        },
    );

    await Cocktail.create(
        {
            user: Marsel._id,
            cocktailName: 'Manhattan',
            cocktailImage: 'fixtures/manhattan.webp',
            receipt: 'Pour in bourbon, vermouth and agnostura into shaker for cocktails and start to shake. Put a few cubes of ice to glass and after strain to glass mixture from shaker. Decorate cocktail with cherry.',
            isPublished: true,
            ingredients: [
                {
                    id: randomUUID(),
                    name: 'bourbon',
                    amount: '50 ml'
                },
                {
                    id: randomUUID(),
                    name: 'red vermouth',
                    amount: '25 ml'
                },
                {
                    id: randomUUID(),
                    name: 'agnostura',
                    amount: '1 ml'
                },
                {
                    id: randomUUID(),
                    name: 'cubes of ice',
                    amount: '200g'
                },
                {
                    id: randomUUID(),
                    name: 'cherry',
                    amount: '1 thing'
                },
            ]
        },
        {
            user: John._id,
            cocktailName: 'B-52',
            cocktailImage: 'fixtures/manhattan.webp',
            receipt: 'Pour coffee liqueur into a shot glass. Slowly pour in Irish cream liqueur, so it floats on top. Slowly pour in triple sec to create a 3-layer drink.',
            isPublished: true,
            ingredients: [
                {
                    id: randomUUID(),
                    name: 'fluid ounce coffee-flavored Kahlua',
                    amount: '1/2  ml'
                },
                {
                    id: randomUUID(),
                    name: "fluid ounce Irish cream Bailey's",
                    amount: '1/2 ml'
                },
                {
                    id: randomUUID(),
                    name: 'fluid ounce triple sec',
                    amount: '1/2 ml'
                },
            ]
        }
    )
    await db.close();
}

run().catch(console.error);