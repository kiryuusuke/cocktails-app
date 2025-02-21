import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getPublishedCocktails} from "../../store/thunks/cocktailThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import CocktailItem from "./CocktailItem.tsx";
import {Box} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector((state) => state.cocktails.cocktails);
    const loading = useAppSelector((state) => state.cocktails.isLoading);

    useEffect(() => {
        dispatch(getPublishedCocktails());
    }, [dispatch]);
    return (
        <Box
            sx={{
                paddingTop: 20,
                height: '200vh',
                backgroundImage: 'url(https://images5.alphacoders.com/300/300229.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            {loading ? <Spinner/>
            :
                <Grid container spacing={2} justifyContent="center">
                    {cocktails.map((cocktail) => (
                        <Grid key={cocktail._id} >
                        <CocktailItem cocktails={cocktail}/>
                        </Grid>
                    ))}
                </Grid>
            }
        </Box>
    );
};

export default Cocktails;