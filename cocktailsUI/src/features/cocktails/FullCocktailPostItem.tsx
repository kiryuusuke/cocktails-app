import React from 'react';
import {Cocktail} from "../../typesUI.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";

interface Props {
    cocktails: Cocktail;
}

const AdminCocktailItem: React.FC<Props> = ({cocktails}) => {
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
                    <NavLink to={`/${cocktails._id}/addIngredients`}>Add New Ingredient</NavLink>
                </div>
                <div>
                    {cocktails.receipt}
                </div>
            </div>
        </>
    );
};

export default AdminCocktailItem;