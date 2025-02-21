import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getOneCocktail} from "../../store/thunks/cocktailThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import FullCocktailPostItem from "./FullCocktailPostItem.tsx";
import {Box} from "@mui/material";

const FullCocktailPostPage = () => {
    const {cocktailId} = useParams();
    const dispatch = useAppDispatch();
    const cocktail = useAppSelector((state) => state.cocktails.oneCocktail);
    const loading = useAppSelector((state) => state.cocktails.isLoading);

    useEffect(() => {
        if(!cocktailId) {
            console.error('Cocktail is not exist!');
            return
        }
        dispatch(getOneCocktail(cocktailId))
    }, [dispatch, cocktailId]);

    if (!cocktail) return null

    return (
        <>
            {loading ? <Spinner />
            :
            <Box sx={{paddingTop: 10, bgcolor: 'black'}}>
                <FullCocktailPostItem key={cocktail._id} cocktails={cocktail}/>
            </Box>

            }
        </>
    );
};

export default FullCocktailPostPage;