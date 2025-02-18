import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {List, ListItem} from "@mui/material";

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
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};

export default AdminNav;