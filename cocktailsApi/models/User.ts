import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from 'bcrypt';
import {randomUUID} from "node:crypto";
import {UserTypes} from "../typesApi";

interface UserMethods {
    passwordCheckout(password: string): Promise<boolean>;
    generateToken(): void
}

type UserModel = Model<UserTypes, {}, UserMethods>;

const SALT_WORK_FACTOR = 8;

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const Schema = mongoose.Schema;

const UserSchema = new Schema<
    HydratedDocument<UserTypes>,
    UserModel,
    UserMethods>
({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<UserTypes>, value: string): Promise<boolean> {
                return regEmail.test(value);
            },
            message: 'Invalid email!',
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: {
        type: String,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    googleId: String,
    userAvatar: {
        type: String,
        default: null,
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
})

UserSchema.methods.passwordCheckout = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = randomUUID();
};

const User = mongoose.model("User", UserSchema);
export default User;