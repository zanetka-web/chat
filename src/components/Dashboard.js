import React, { useContext, useEffect, useState } from 'react';
import { CTX } from './Store';
import Login from './Login';
import Chat from './Chat';

function Dashboard() {
    const { state } = useContext(CTX);
    const [screen, changeScreen] = useState(<Login />);

    useEffect(() => {
        if (state.logged) {
            changeScreen(<Chat />);
        } else {
            changeScreen(<Login />);
        }
    }, [state.logged]);

    return (
        <div className="chat">
            <h1>RS School - Chat</h1>
            {screen}
        </div>
    )
}

export default Dashboard;