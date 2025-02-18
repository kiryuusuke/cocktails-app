export interface User {
    _id: string
    email: string;
    role: string;
    token: string;
    googleId: string;
    displayName: string;
    userAvatar: string | null;
}


export interface RegisterResponse {
    user: User;
    message: string
}

export interface ValidationErr {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    }
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string
}

export interface RegisterUser {
    email: string;
    password: string;
    userAvatar: File | null;
    displayName: string;
}

export interface LoginUser {
    email: string;
    password: string;
}