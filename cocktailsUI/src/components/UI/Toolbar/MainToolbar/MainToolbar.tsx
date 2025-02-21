import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../../app/hooks.ts";
import ExistsUser from "../ExistsUser/ExistsUser.tsx";
import UnknownUser from "../UnknownUser/UnknownUser.tsx";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";

const MainToolbar = () => {
    const user = useAppSelector((state) => state.users.user)
    return (
        <>
            <AppBar
                position='fixed'
                sx={{
                    justifyContent: 'center',
                    boxShadow: 'none',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    mt: '20px'
                }}>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        <NavLink to='/' className='text-decoration-none text-black'>
                            Learn Your Favorite Cocktail
                        </NavLink>
                    </Typography>
                {user ? (
                    <>
                        <ExistsUser user={user}/>
                    </>
                ) : (
                    <>
                        <UnknownUser />
                    </>
                )}

                </Toolbar>
            </AppBar>
        </>
    );
};

export default MainToolbar;