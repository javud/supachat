import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ChatPage.scss';
import { SignOutButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://tbbcepeadocfkrsgzqou.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function ChatPage() {
    const { isSignedIn, user } = useUser();
    const [usersList, setUsersList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState('friends');

    // fetch list of users from the server
    useEffect(() => {
        axios
            .get('http://localhost:5001/api/get-clerk-users')
            .then((response) => {
                const users = response.data.data;
                console.log(users);
                setUsersList(users);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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

        const msgContent = message;
        setMessage('');
        setLoading(true);
        const { error } = await supabase
            .from('Messages')
            .insert([
                {
                    from_user: user.id,
                    to_user: user.id,
                    content: msgContent,
                    time_sent: new Date(),
                },
            ]);
        setLoading(false);
        fetchMessages();
        if(error) {
            console.log("Error sending message: ", error);
        }
    };

    function toggleMode(mode) {
        setMode(mode);
    }

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
            <SignOutButton className="signOutBtn"/>
            <div className="panel">
                <p className={`panelItem ${mode === 'friends' ? 'selected' : ''}`} onClick={(e) => toggleMode('friends')}>Friends</p>
                <p className={`panelItem ${mode === 'chat' ? 'selected' : ''}`} onClick={(e) => toggleMode('chat')}>Chat</p>
            </div>
            {mode === 'friends' && (
                <div className="userListPanel">
                    <strong>Supachat Friends</strong>
                    <div className="users">
                        {usersList.length === 0 ? (
                            <p>No users available.</p>
                        ) : (
                            usersList.map((user, index) => (
                                <p key={user.id} className="username">{user.firstName}</p>
                            ))
                        )}
                    </div>
                </div>
            )}
            {mode === 'chat' && (
                <div className="messageContainer">
                    <div className="chattingWith">Chat with NAME</div>
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
                        placeholder={loading ? "Sending..." : "Message"}
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
            )}
        </div>
    )
}

export default ChatPage;