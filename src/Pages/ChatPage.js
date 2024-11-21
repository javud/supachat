import React, { useState, useEffect } from 'react';
import '../Styles/ChatPage.scss';
import { SignOutButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://tbbcepeadocfkrsgzqou.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function ChatPage() {
    const { isSignedIn, user } = useUser();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        if(!user) return;

        const {data, error} = await supabase
            .from('Messages')
            .select()
            .or('from_user.eq.' + user.id + ',to_user.eq.' + user.id)

        if(error) {
            console.log("Error fetching messages: ", error);
        } else {
            setMessages(data);
        }
    };

    const sendMessage = async () => {
        if(!user || !message) return;

        const { error } = await supabase
            .from('Messages')
            .insert([
                {
                    from_user: user.id,
                    to_user: user.id,
                    content: message,
                    time_sent: new Date(),
                },
            ]);
        setMessage('');
        if(error) {
            console.log("Error sending message: ", error);
        }
    };

    useEffect(() => {
        if(isSignedIn) {
            fetchMessages();
        }
    }, [isSignedIn, user?.id]);

    if (!isSignedIn) {
        return (
            <div className="ChatPage">
                <h1>You must be signed in to view this page.</h1>
            </div>
        )
    }

    return (
        <div className="ChatPage">
            <h1>{user.firstName}</h1>
            <SignOutButton className="signOutBtn"/>
            <div className="messageContainer">
                <div className="messages">
                    {messages.length === 0 ? (
                        <p>No messages available.</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.from_user === user.id ? 'you' : ''}`}>
                                <p className="content">{msg.content}</p>
                                {msg.from_user !== user.id && (
                                    <p className="user">Someone Else</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="messageBox">
                    <textarea
                        id="txtArea"
                        rows="1"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                    />
                    <div className={`messageBtn ${message ? 'visible' : ''}`} onClick={sendMessage}>Send</div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;