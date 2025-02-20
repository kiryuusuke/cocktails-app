import React from 'react';
import {Cocktail} from "../../typesUI.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";

interface Props {
    cocktails: Cocktail;
}

const CocktailItem: React.FC<Props> = ({cocktails}) => {
    return (
        <>
            <NavLink to={`/cocktails/${cocktails._id}`}>
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
         </div>
            </NavLink>
        </>
    );
};

export default CocktailItem;