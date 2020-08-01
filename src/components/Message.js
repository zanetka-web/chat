import React from 'react';

function Message(props) {
    return (
        <div className={props.user === props.message.from ? 'message me' : 'message'}>
            <span className="user">{props.message.from}</span>
            <span className="text">{props.message.message}</span>
        </div>
    )
}

export default Message;