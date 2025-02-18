import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert, Avatar, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {GoogleLogin} from "@react-oauth/google";
import {LoginUser} from "../../typesUI.ts";
import {googleLogin, login} from "../../store/thunks/userThunk.ts";

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector((state) => state.users.loginError);
    const navigate = useNavigate();

    const [user, setUser] = useState<LoginUser>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prevState) => (
            {
                ...prevState,
                [name]: value
            }
        ));
    };

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login(user)).unwrap();
        console.log(user)
        navigate('/');
    };

    const handleGoogleLogin = async(credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>

                    {loginError && (
                        <Alert severity='error' sx={{mt: 3, width: '100%'}}>
                            {loginError.error}
                        </Alert>
                    )}

                    <Box>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                if(credentialResponse.credential) {
                                    void handleGoogleLogin(credentialResponse.credential)
                                }
                            }}
                            onError={() => alert('Login failed')}/>
                    </Box>

                    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container direction={'column'} size={12} spacing={2}>

                            <Grid size={{xs: 12}}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{xs: 12}}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log in
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <NavLink to='/register'>
                                    Don't have an account? Sign Up
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default RegisterPage;