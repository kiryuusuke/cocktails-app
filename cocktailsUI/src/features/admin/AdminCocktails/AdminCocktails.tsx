import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {getAllCocktails} from "./AdminCocktailThunk.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import AdminCocktailItem from "./AdminCocktailItem.tsx";


const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector((state) => state.adminCocktails.cocktails);
    const loading = useAppSelector((state) => state.adminCocktails.isLoading);

    useEffect(() => {
        dispatch(getAllCocktails());
    }, [dispatch]);
    return (
        <div>
            {loading ? <Spinner/>
                :
                <ul>
                    {cocktails.map((cocktail) => (
                        <AdminCocktailItem key={cocktail._id} cocktails={cocktail} />
                    ))}
                </ul>
            }
        </div>
    );
};

export default Cocktails;