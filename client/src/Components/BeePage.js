import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Button } from "@material-ui/core"

const style = {
    background: '#FE3B8B',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 38,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
 };

const BeePage = ({ timeDifference }) => {
    const beeId = useParams().bee_id;
    const hiveId = useParams().hive_id;
    const initialBee = {
        hive_id: "",
        user: {
            first_name: "",
            last_name: "",
            id: 0
        }
    };

    const initialMessage = {
        comment: "",
        img_url: "",
    };

    const [bee, setBee] = useState(initialBee);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(initialMessage);
    const [messageErrors, setMessageErrors] = useState([]);

    useEffect(() => {
        fetch(`/bees/${beeId}`)
            .then(response => response.json())
            .then(json => setBee(json))
    }, [beeId]);

    useEffect(() => {
        fetch(`/messages/${bee.user.id}`)
            .then(response => response.json())
            .then(json => setMessages(json))
}, [bee]);

    const sortedMessages = messages.sort((a, b) => a["updated_at"] - b["updated_at"]);

    const currentTime = Date.now();

    const messagesArray = sortedMessages.map(message => {

        return (
            <li className="message" key={message.id}>
                <p>{message.comment}</p>
                {message.img_url ? <img onError={e => e.target.src="data:image/jpeg;base64,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"} src={message.img_url} alt="" className="post" /> : null}
                <p>{timeDifference(currentTime, message.updated_at * 1000)}</p>
                <br />
            </li>
        );
    });

    const handleMessage = e => {
        const newMessageCopy = {...newMessage, [e.target.name]: e.target.value};
        setNewMessage(newMessageCopy); 
    };

    const handleSubmitMessage = e => {
        e.preventDefault();

        fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                message: { 
                    comment: newMessage.comment,
                    img_url: newMessage.img_url,
                    receiver_id: bee.user.id,
                    hive_id: hiveId
                }
            })
        })
            .then(response => response.json())
            .then(json => {
                if (!json.errors) {
                    const messagesCopy = [...messages];
                    messagesCopy.push(json);
                    setMessages(messagesCopy);
                    setNewMessage(initialMessage);
                } else {
                    setMessageErrors(json.errors);
                }
            })
    };

    return (
        <div className="pageDiv">
            <header>{bee.hive_name}</header>
            <br />
            <br />
            <hr />
            <br />
            <h2>{bee.user.first_name} {bee.user.last_name}</h2>
            <br />
            <h3>Your Words of Honey to {bee.user.first_name}:</h3>
            <br />
            <ul>
                {messagesArray}
            </ul>
            <br />
            <hr />
            <br />
            <h3>Send a new message:</h3>
            <form onSubmit={handleSubmitMessage}>
                <br />
                <label htmlFor="comment">Comment:</label>&nbsp;&nbsp;
                <input className="searchInput" onChange={handleMessage} value={newMessage.comment} type="text" name="comment" placeholder="Enter comment..." />
                <br />
                <label htmlFor="img_url">Image URL:</label>&nbsp;&nbsp;
                <input className="searchInput" onChange={handleMessage} value={newMessage.img_url} type="text" name="img_url" placeholder="Enter image url..." />
                <br />
                <br />
                <Button style={style} type="submit">Send message</Button>
                <br />
            </form>
            {messageErrors.map(messageError => <p className="error-message" key={messageError}>{messageError}</p>)}
        </div>
    )
}

export default BeePage;
