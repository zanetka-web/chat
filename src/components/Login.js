import React, { useState, useContext, useEffect } from 'react';
import { CTX } from './Store';

function Login() {
    const [user, setUser] = useState(localStorage.getItem('user') || '');
    const { state, dispatch } = useContext(CTX);
    const changeUserName = (e) => {
        setUser(e.target.value);
    }
    const onClick = () => {
        if(user) {
            dispatch({ type: 'SET_USER', payload: user });
        }
    };

    useEffect(() => {
        if (state.user) {
            dispatch({ type: 'LOGIN' });
        }
    }, [state.user, dispatch]);

    return (
        <div className="login">
            <input type="text" onChange={changeUserName} value={user} placeholder="Nickname..."></input>
            <button onClick={onClick} disabled={!user}>Login</button>
            <p className="info">{state.info}</p>
        </div>
    );
}

export default Login;