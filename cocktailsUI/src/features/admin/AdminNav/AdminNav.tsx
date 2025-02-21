import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

const AdminNav = () => {
    return (
        <Grid container>
            <Grid>
                <Typography variant="h5">
                    Admin Nav
                </Typography>
            </Grid>
            <Grid>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/cocktails'>
                        <ListItemText primary='Cocktails'/>
                    </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};

export default AdminNav;