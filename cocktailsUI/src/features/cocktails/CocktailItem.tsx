import React from 'react';
import {Cocktail} from "../../typesUI.ts";
import {BASE_URL} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import {Box, Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
    cocktails: Cocktail;
}

const CocktailItem: React.FC<Props> = ({cocktails}) => {
    return (
        <>
            <NavLink to={`/cocktails/${cocktails._id}`} style={{ textDecoration: 'none' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 250,
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <Card sx={{bgcolor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(15px)'}}>
                        {cocktails.cocktailImage && (
                            <CardMedia
                                component="img"
                                image={`${BASE_URL}/public/${cocktails.cocktailImage}`}
                                alt={cocktails.cocktailName}
                                sx={{
                                    height: 180,
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {cocktails.cocktailName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Author: {cocktails.user.displayName}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </NavLink>
        </>
    );
};

export default CocktailItem;