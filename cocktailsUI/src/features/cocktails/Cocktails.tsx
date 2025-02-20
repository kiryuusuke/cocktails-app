import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getPublishedCocktails} from "../../store/thunks/cocktailThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import CocktailItem from "./CocktailItem.tsx";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector((state) => state.cocktails.cocktails);
    const loading = useAppSelector((state) => state.cocktails.isLoading);

    useEffect(() => {
        dispatch(getPublishedCocktails());
    }, [dispatch]);
    return (
        <div>
            {loading ? <Spinner/>
            :
                <ul>
                    {cocktails.map((cocktail) => (
                        <CocktailItem key={cocktail._id} cocktails={cocktail}/>
                    ))}
                </ul>
            }
        </div>
    );
};

export default Cocktails;