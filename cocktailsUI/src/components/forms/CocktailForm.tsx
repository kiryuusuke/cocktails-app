import {ChangeEvent, FormEvent, useState} from 'react';
import {CocktailMutation} from "../../typesUI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNewCocktail} from "../../store/thunks/cocktailThunk.ts";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import FileInput from "../UI/FileInput/FileInput.tsx";
import {CloudUpload} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const initialState = {
    user: '',
    cocktailName: '',
    receipt: '',
    ingredients: '',
    cocktailImage: null,
    isPublished: false
}

const CocktailForm = () => {
    const [form, setForm] = useState<CocktailMutation>(initialState)
    const [ingredients, setIngredients] = useState<{name: string; amount: string}[]>([]);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.users.user);
    const navigate = useNavigate()

    if(!user) return console.log('user not found')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addNewCocktail({...form, ingredients: JSON.stringify(ingredients), user: user._id}))
        navigate('/');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const fileHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
    };

    const addIngredient = () => {
        setIngredients((prevState) => ([
            ...prevState,
        {name: '',
        amount: ''}
        ]));
    };

    const deleteIngredient = (index: number) => {
        setIngredients(ingredients.filter((_ing, i) => i !== index));
    };

    const handleIngredientsChange = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setIngredients(ingredients.map((ing, index) => {
            const ingCopy = {
                ...ingredients[i],
                [name]: value
            };
            if(index === i) return ingCopy;
            return ing
        }));
    };

    return (
        <form style={{marginTop: '100px' }} onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
                <Grid size={{xs: 12}}>
                    <TextField
                        id="cocktailName"
                        name="cocktailName"
                        label="Cocktail Name"
                        fullWidth
                        required
                        value={form.cocktailName}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <span>Ingredients</span>
                    {ingredients.map((_ing, i) => (
                        <Grid container key={i} direction="row">
                            <Grid>
                                <TextField
                                    name="name"
                                    label="Name"
                                    required
                                    onChange={e => handleIngredientsChange(i, e)}
                                />
                            </Grid>

                            <Grid>
                                <TextField
                                    type="string"
                                    name="amount"
                                    label="Amount"
                                    required
                                    onChange={e => handleIngredientsChange(i, e)}
                                />
                            </Grid>

                            <Grid>
                                {ingredients.length <= 1 ? null :
                                    <Grid>
                                        <Button type="button" onClick={() => deleteIngredient(i)}>X</Button>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>

                    ))}

                    <Grid>
                        <Button type="button" onClick={addIngredient}> + Add new ingredient</Button>
                    </Grid>

                </Grid>


                <Grid size={{xs: 12}}>
                    <TextField
                        id="receipt"
                        name="receipt"
                        label="Receipt"
                        fullWidth
                        required
                        value={form.receipt}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <FileInput
                        fullWidth
                        label="Image"
                        name="cocktailImage"
                        buttonText="Choose file"
                        buttonProps={{startIcon: <CloudUpload/>}}
                        onChange={fileHandleChange}
                    />
                </Grid>

                <Grid>
                    <Button type="submit" color="primary">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;