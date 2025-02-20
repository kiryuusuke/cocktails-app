import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getUsersCocktails} from "../../store/thunks/cocktailThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import CocktailItem from "../cocktails/CocktailItem.tsx";

const UsersCocktails = () => {
    const {userId} = useParams();
    const dispatch = useAppDispatch();
    const userCocktails = useAppSelector((state) => state.cocktails.cocktails);
    const loading = useAppSelector((state) => state.cocktails.isLoading);

    useEffect(() => {
        if(!userId) {
            console.log('User not found!');
            return
        }
        dispatch(getUsersCocktails(userId));
    }, [dispatch, userId]);
    return (
        <>
            {loading ? <Spinner />
            :
            <>
                {userCocktails.map((cocktail) => (
                    <CocktailItem key={cocktail._id} cocktails={cocktail}/>
                ))}
            </>
            }
        </>
    );
};

export default UsersCocktails;