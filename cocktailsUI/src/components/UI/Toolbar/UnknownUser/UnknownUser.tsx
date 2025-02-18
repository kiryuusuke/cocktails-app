import {NavLink} from "react-router-dom";

const UnknownUser = () => {
    return (
        <>
            <div>
                <NavLink to='/login' className='btn btn-light me-3' style={{borderRadius: '20px'}}>
                    Log In
                </NavLink>

                <NavLink to='/register' className='btn btn-light' style={{borderRadius: '20px'}}>
                    Sign Up
                </NavLink>
            </div>
        </>
    );
};

export default UnknownUser;