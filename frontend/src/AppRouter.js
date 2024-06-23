import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import Home from './components/Home';
import OfflineBoard from './components/offline/OfflineBoard';
import OnlineBoard from './components/online/OnlineBoard';
import Auth from "./components/auth/Auth";

function AppRouter() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={user ? <Home /> : <Navigate to={'/login'} />} />
                <Route path='/login' element={user ? <Navigate to={'/'} /> : <Auth />} />
                <Route path="/offline" element={user ? <OfflineBoard /> : <Navigate to={'/login'} />} />
                <Route path="/online" element={user ? <OnlineBoard /> : <Navigate to={'/login'} />} />
            </Routes>
        </Router>
  );
}

export default AppRouter;
