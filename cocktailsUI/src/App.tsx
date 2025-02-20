import MainToolbar from "./components/UI/Toolbar/MainToolbar/MainToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import ProtectedRoute from "./features/ProtectedRoute/ProtectedRoute.tsx";
import AdminLayout from "./features/admin/AdminLayout/AdminLayout.tsx";
import {useAppSelector} from "./app/hooks.ts";
import AdminCocktails from "./features/admin/AdminCocktails/AdminCocktails.tsx";

const App = () => {
    const user = useAppSelector((state) => state.users.user)
    return (
        <div>
            <header>
                <MainToolbar />
            </header>
            <Routes>
                <Route path='/' element={<Cocktails /> } />
                <Route path='/admin' element={
                    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                  <Route path='cocktails' element={<AdminCocktails /> } />
                </Route>
                <Route path='*' element={<p>Not found</p>} />
            </Routes>
        </div>
    );
};

export default App;