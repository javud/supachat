import ChatPage from './Pages/ChatPage';
import './App.scss';
import { SignedIn, SignedOut, SignInButton} from "@clerk/clerk-react";
import logo from "./Assets/slogo.png";

function Footer() {
    return (
        <div className="Footer">
            <p>Developed by <a href="https://javud.com" target="_blank" rel="noopener noreferrer">Javid U.</a></p>
        </div>
    )
}

function App() {
  return (
    <div className="App">
        <SignedOut>
            <img src={logo} className="sLogo" alt="logo"/>
            <h1 className="title">Supachat</h1>
            <p>A fun and immersive chat experience</p>
            <SignInButton mode={'modal'}>
                <div className="signInBtn">
                    Get Started
                </div>
            </SignInButton>
            <p className="learnMore">Learn More</p>
            <Footer />
        </SignedOut>
        <SignedIn>
            <ChatPage />
        </SignedIn>
    </div>
  );
}

export default App;
