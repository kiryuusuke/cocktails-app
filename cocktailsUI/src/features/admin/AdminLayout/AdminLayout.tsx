import Grid from "@mui/material/Grid2";
import {Outlet} from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav.tsx";

const AdminLayout = () => {
    return (
        <Grid container>
            <Grid>
                <AdminNav/>
            </Grid>
            <Grid>
                <Outlet/>
            </Grid>
        </Grid>
    );
};

export default AdminLayout;