import React from 'react';
import {Cocktail} from "../../../typesUI.ts";
import {BASE_URL} from "../../../globalConstants.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {deleteCocktail} from "./AdminCocktailThunk.ts";

interface Props {
    cocktails: Cocktail;
}

const AdminCocktailItem: React.FC<Props> = ({cocktails}) => {
    const dispatch = useAppDispatch();

    const publishedCheckout = () => {
        cocktails.isPublished = true
    }

    const handleDelete = async() => {
        if(window.confirm("Are you sure you want to delete?")){
            await dispatch(deleteCocktail(cocktails._id));
        }
    }
    return (
        <>
                <div>
                    <div>
                        {cocktails.cocktailImage && (
                            <img src={`${BASE_URL}/public/${cocktails.cocktailImage}`} alt={cocktails.cocktailName}/>
                        )}
                    </div>
                    <div>
                        {cocktails.user.displayName}
                    </div>
                    <div>
                        {cocktails.cocktailName}
                    </div>
                    <div>
                        {cocktails.ingredients.map((ingredient) => (
                            <>
                            <p>
                                {ingredient.name}
                            </p>
                            <p>{ingredient.amount}</p>
                            </>
                        ))}
                    </div>
                    <div>
                        {cocktails.receipt}
                    </div>
                    <button onClick={publishedCheckout}>Publish</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
        </>
    );
};

export default AdminCocktailItem;