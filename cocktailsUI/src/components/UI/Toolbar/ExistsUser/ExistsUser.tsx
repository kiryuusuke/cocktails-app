import React, {useState} from 'react';
import {Avatar, Box, Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../../app/hooks.ts";
import {User} from "../../../../typesUI.ts";
import {logout} from "../../../../store/thunks/userThunk.ts";
import {logoutUser} from "../../../../store/slices/userSlice.ts";
import {BASE_URL} from "../../../../globalConstants.ts";


interface Props {
    user: User
}

const ExistsUser: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const onClose = () => {
        setAnchorEl(null);
    }

    const userLogout = () => {
        dispatch(logout());
        dispatch(logoutUser())
    }

    return (
        <>
            <div>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={`${BASE_URL}/public/${user.userAvatar}`} alt={user.displayName} />
                    <Button
                        onClick={onClick}
                        style={{color: 'white'}}>
                        {user.displayName}
                    </Button>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={onClose}>

                    {user && user.role === 'admin' &&
                        <MenuItem>
                            <NavLink to='/admin' className='text-decoration-none text-black'>
                                For Admin
                            </NavLink>
                        </MenuItem>
                    }
                    <MenuItem>
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={userLogout}>
                        Log out
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
};

export default ExistsUser;