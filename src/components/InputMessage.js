import React, { useContext, useState } from 'react';
import { CTX } from './Store';

function InputMessage() {
    const { dispatch } = useContext(CTX);
    const [ currentMsg, setMsg ] = useState('');

    const updateMsg = (e) => {
        setMsg(e.target.value);
    };

    const sendMsg = () => {
        dispatch({ type: 'SEND_MSG', payload: currentMsg });
        setMsg('');
    }

    return (
        <div className="input-message">
            <input type="text" placeholder="Add msg here..." value={currentMsg} onChange={updateMsg}></input>
            <button onClick={sendMsg}>SEND</button>
        </div>
    )
}

export default InputMessage;