import React, {ChangeEvent, FormEvent, useState} from 'react';
import { Cocktail } from "../../typesUI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {  } from '../../store/slices/cocktailSlice';
import {BASE_URL} from "../../globalConstants.ts";
import {addIngredients} from "../../store/thunks/cocktailThunk.ts";
import {Box, Button, Card, CardContent, CardMedia, IconButton, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {Delete} from "@mui/icons-material";

interface Props {
    cocktails: Cocktail;
}

const AdminCocktailItem: React.FC<Props> = ({ cocktails }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.users.user);
    const [ingredients, setIngredients] = useState<{ name: string; amount: string }[]>([]);

    const addIngredient = () => {
        setIngredients((prevState) => [
            ...prevState,
            { name: '', amount: '' }
        ]);
    };

    const deleteIngredient = (index: number) => {
        setIngredients(ingredients.filter((_ing, i) => i !== index));
    };

    const handleIngredientChange = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIngredients((prevState) =>
            prevState.map((ing, index) =>
                index === i ? { ...ing, [name]: value } : ing
            )
        );
    };

    const handleAddIngredient = (e: FormEvent) => {
        e.preventDefault();
        if (ingredients.some(ingredient => !ingredient.name || !ingredient.amount)) {
            alert('Please enter all fields for each ingredient!');
            return;
        }
        ingredients.forEach((ingredient) => {
            dispatch(addIngredients({ cocktailId: cocktails._id, ingredients: ingredient }));
        });
        setIngredients([{ name: '', amount: '' }]);
    };



    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: '0 auto',
                p: 3,
                boxShadow: 3,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(15px)'
            }}
        >
            <Card sx={{ boxShadow: 0, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.2)'}}>
                {cocktails.cocktailImage && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={`${BASE_URL}/public/${cocktails.cocktailImage}`}
                        alt={cocktails.cocktailName}
                        sx={{ objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {cocktails.cocktailName}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                        Author: {cocktails.user.displayName}
                    </Typography>

                    <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold' }}>
                        Ingredients:
                    </Typography>
                    <Grid container spacing={1}>
                        {cocktails.ingredients.map((ingredient) => (
                            <Grid key={ingredient._id}>
                                <Box
                                    sx={{
                                        backgroundColor: '#f8f8f8',
                                        p: 1,
                                        borderRadius: 1,
                                        boxShadow: 1,
                                    }}
                                >
                                    <Typography variant="body1">{ingredient.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {ingredient.amount}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {user && user.token && (
                        <Box component="form" onSubmit={handleAddIngredient} sx={{ mt: 4 }}>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Add Ingredient
                            </Typography>
                            {ingredients.map((ingredient, index) => (
                                <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                                    <Grid>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            fullWidth
                                            label="Amount"
                                            name="amount"
                                            value={ingredient.amount}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        />
                                    </Grid>
                                    <Grid>
                                        <IconButton
                                            color="error"
                                            onClick={() => deleteIngredient(index)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}

                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={addIngredient}
                                sx={{ mt: 1, mr: 2 }}
                            >
                                Add New Ingredient
                            </Button>
                            <Button type="submit" variant="contained" color="success" sx={{ mt: 1 }}>
                                Save
                            </Button>
                        </Box>
                    )}

                    <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold' }}>
                        Recipe:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        {cocktails.receipt}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminCocktailItem;
