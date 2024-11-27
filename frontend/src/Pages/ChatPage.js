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
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [mode, setMode] = useState('friends');

    // fetch list of users from the server
    useEffect(() => {
        axios
            .get('http://localhost:5001/api/get-clerk-users')
            .then((response) => {
                const users = response.data.data;
                const usersFiltered = users.filter(u => u.id !== user.id);
                setUsersList(usersFiltered);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const fetchMessages = async () => {
        if(!user || !selectedUser) return;

        setLoading(true);
        const {data, error} = await supabase
            .from('Messages')
            .select('*')
            .or(
                `and(from_user.eq.${user.id},to_user.eq.${selectedUser.id}),and(from_user.eq.${selectedUser.id},to_user.eq.${user.id})`
            )
            .order('time_sent', { ascending: true });
        setLoading(false);
        if(error) {
            console.log("Error fetching messages: ", error);
        } else {
            console.log("Messages: ", data);
            setMessages(data);
        }
    };

    const sendMessage = async () => {
        if(!user || !message || !selectedUser) return;

        const msgContent = message;
        setMessage('');
        setSending(true);
        const { error } = await supabase
            .from('Messages')
            .insert([
                {
                    from_user: user.id,
                    to_user: selectedUser.id,
                    content: msgContent,
                    time_sent: new Date(),
                },
            ]);
        setSending(false);
        await fetchMessages();
        if(error) {
            console.log("Error sending message: ", error);
        }
    };

    function toggleMode(mode) {
        setMode(mode);
    }

    useEffect(() => {
        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser]);

    function changeSelectedUser(user) {
        if(user !== selectedUser) {
            setMessages([]);
            setSelectedUser(user);
        }
        if(user) {
            toggleMode('chat');
        } else {
            toggleMode('friends');
        }
    }

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
                <p className={`panelItem ${mode === 'friends' && selectedUser ? 'selected' : ''}`} onClick={(e) => toggleMode('friends')}>Friends</p>
                {selectedUser && (<p className={`panelItem ${mode === 'chat' ? 'selected' : ''}`} onClick={(e) => toggleMode('chat')}>Chat</p>)}
            </div>
            {mode === 'friends' && (
                <div className="userListPanel">
                    <strong>Supachat Friends</strong>
                    <div className="addFriend">Add friend</div>
                    <div className="users">
                        {usersList.length === 0 ? (
                            <p>No friends available.</p>
                        ) : (
                            usersList.map((currUser, index) => (
                                <p key={currUser.id} className="username" onClick={(e) => changeSelectedUser(currUser)}>{currUser.firstName} <span className="tag">@{currUser.username}</span></p>
                            ))
                        )}
                    </div>
                </div>
            )}
            {mode === 'chat' && selectedUser && (
                <div className="messageContainer">
                    <div className="closeChat" onClick={(e) => changeSelectedUser(null)}>✖</div>
                    <div className="chattingWith">Chat with {selectedUser.firstName} <span className="tag">@{selectedUser.username}</span></div>
                    <div className="messages">
                        {loading && (
                            <p>Loading message history...</p>
                        )}
                        {!loading && messages.length === 0 ? (
                            <p>No message history available.</p>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.from_user === user.id ? 'you' : ''}`}>
                                    <p className="content">{msg.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="messageBox">
                        <textarea
                            autoFocus
                            id="txtArea"
                            rows="1"
                            placeholder={sending ? "Sending..." : "Message"}
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