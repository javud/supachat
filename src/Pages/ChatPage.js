import '../Styles/ChatPage.scss';
import { SignOutButton } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react'

function ChatPage() {
    const { isSignedIn, user } = useUser();
    if (isSignedIn) {
        return (
            <div className="ChatPage">
                <h1>{user.firstName}</h1>
                <SignOutButton className="signOutBtn"/>
                <div className="messageContainer">
                    <div className="message you">
                        <p className="content">thissssssssssss isssssss aaaaa realllllly loooong teeeexte</p>
                        <p className="user">You</p>
                    </div>
                    <div className="message">
                        <p className="content">thissssssssssss isssssss aaaaa realllllly loooong teeeexte</p>
                        <p className="user">You</p>
                    </div>
                    <div className="message you">
                        <p className="content">whats up bro</p>
                        <p className="user">You</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="ChatPage">
            <h1>You must be signed in to view this page.</h1>
        </div>
    );
}

export default ChatPage;