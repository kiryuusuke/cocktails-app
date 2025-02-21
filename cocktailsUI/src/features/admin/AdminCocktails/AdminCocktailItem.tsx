import React from 'react';
import {Cocktail} from "../../../typesUI.ts";
import {BASE_URL} from "../../../globalConstants.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {deleteCocktail, publishCocktail} from "./AdminCocktailThunk.ts";

interface Props {
    cocktails: Cocktail;
}

const AdminCocktailItem: React.FC<Props> = ({cocktails}) => {
    const dispatch = useAppDispatch();

    const publishedCheckout = async () => {
        if (!cocktails.isPublished) {
            await dispatch(publishCocktail(cocktails._id));
        }
    };

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
                    User
                    {cocktails.user.displayName}
                </div>
                <div>
                    {cocktails.cocktailName}
                </div>
                <div>
                    {cocktails.ingredients.map((ingredient) => (
                        <div key={ingredient._id}>
                            <p>
                                {ingredient.name}
                            </p>
                            <p>{ingredient.amount}</p>
                        </div>
                    ))}
                </div>
                <div>
                    {cocktails.receipt}
                </div>
                <button onClick={publishedCheckout} disabled={cocktails.isPublished}>
                    {cocktails.isPublished ? 'Published' : 'Publish'}
                </button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </>
    );
};

export default AdminCocktailItem;