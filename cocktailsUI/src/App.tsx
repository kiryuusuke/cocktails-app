import MainToolbar from "./components/UI/Toolbar/MainToolbar/MainToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Cocktails from "./features/cocktails/Cocktails.tsx";
import ProtectedRoute from "./features/ProtectedRoute/ProtectedRoute.tsx";
import AdminLayout from "./features/admin/AdminLayout/AdminLayout.tsx";
import {useAppSelector} from "./app/hooks.ts";
import AdminCocktails from "./features/admin/AdminCocktails/AdminCocktails.tsx";
import FullCocktailPostPage from "./features/cocktails/FullCocktailPostPage.tsx";
import UsersCocktails from "./features/users/UsersCocktails.tsx";
import CocktailForm from "./components/forms/CocktailForm.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";

const App = () => {
    const user = useAppSelector((state) => state.users.user)
    return (
        <>
            <header>
                <MainToolbar />
            </header>
            <Routes>
                <Route path='/' element={<Cocktails /> } />
                <Route path='/cocktails/:cocktailId' element={<FullCocktailPostPage /> } />
                <Route path='/cocktails/:userId/mycocktails' element={<UsersCocktails /> } />
                <Route path='/addCocktails' element={<CocktailForm /> } />
                <Route path='/login' element={<LoginPage /> } />
                <Route path='/register' element={<RegisterPage /> } />
                <Route path='/admin' element={
                    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                  <Route path='cocktails' element={<AdminCocktails /> } />
                </Route>
                <Route path='*' element={<p>Not found</p>} />
            </Routes>
        </>
    );
};

export default App;