import React, { useContext } from 'react';
import { CTX } from './Store';
import Message from './Message';

function Messages() {
    const { state } = useContext(CTX);

    return (
        <div className="messages">
            {state.messages.map((msg) => {
                return <Message message={msg} key={msg.id} user={state.user} />
            })}
        </div>
    )
}

export default Messages;