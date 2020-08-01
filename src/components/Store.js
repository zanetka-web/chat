import React, { useReducer, useEffect } from 'react';

const Socket = new WebSocket("ws://chat.shas.tel");

const sendMessage = function (msg) {
    Socket.send(JSON.stringify(msg));
}

function notifyMe(msg) {
    if (!("Notification" in window)) {
        console.error('browser can not show notifications');
    }
    else if (Notification.permission === "granted") {
        new Notification(msg);
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(msg);
            }
        });
    }
}

const initState = {
    messages: [],
    user: null,
    logged: false,
    info: ''
}


function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('user', action.payload);
            return { ...state, user: action.payload };
        case 'LOGIN':
            return { ...state, logged: true, info: '' };
        case 'LOGOUT':
            let info = '';
            
            if(action.payload.error) {
                info = 'You were disconnected, click in login to join the chat again...';
            }

            return { ...state, logged: false, messages: [] , info : info};
        case 'RECEIVE_MSG':
            return { ...state, messages: [...state.messages, ...action.payload] };
        case 'SEND_MSG':
            sendMessage({ from: state.user, message: action.payload });
            return state;
        default:
            return state;
    }
}

export const CTX = React.createContext();

function Store(props) {
    const [state, dispatch] = useReducer(reducer, initState);

    Socket.onopen = (event) => {
        console.log('connected', event);
    };

    Socket.onmessage = (event) => {
        const data = JSON.parse(event.data).reverse();
        dispatch({ type: 'RECEIVE_MSG', payload: data });
    }

    Socket.onclose = () => {
        dispatch({ type: 'LOGOUT' });
    }

    Socket.onerror = () => {
        dispatch({ type: 'LOGOUT', payload: { error: true } });
    }

    useEffect(() => {
        const msgLength = state.messages.length;
        const lastMsg = msgLength && state.messages[msgLength - 1];

        if (lastMsg && state.user !== lastMsg.from && state.logged && !document.hasFocus()) {
            notifyMe(`From: ${lastMsg.from} - ${lastMsg.message}`);
        }
    });

    return <CTX.Provider value={{ state, dispatch }}>
        {props.children}
    </CTX.Provider>
}

export default Store;