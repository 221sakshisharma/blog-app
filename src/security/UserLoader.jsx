// session persistence even after reload
// as on reload redux state gets reset without deleting the session but if the sesssion exist
// then update redux state

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login as stateLogin, logout as stateLogout } from "../state/authSlice"
import authService from '../appwrite/auth'

const UserLoader = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.getCurrentSession()
            .then((session) => {
                if (session) dispatch(stateLogin(session))
                else dispatch(stateLogout());
            }).catch((err) => {
                console.log("get current session :: anonymous user")
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Loading...
            </div>
        );
    }

    return children;
}

export default UserLoader