# Supachat React App

Supachat is a modern chat application built using **React**, **Supabase**, and **Clerk** for authentication. The app enables users to chat with their friends, view message history, and easily send real-time messages.

This project leverages Supabase for database management (storing messages), Clerk for user authentication, and React for the front-end.

## Features

- **User Authentication:** Users can sign in and out using Clerk authentication.
- **User List:** Displays a list of available friends to chat with.
- **Real-Time Messaging:** Users can send and receive messages with their friends.
- **Message History:** Displays a history of messages between the logged-in user and their selected friend.
- **Responsive UI:** Designed for both desktop and mobile devices.
- **Auto-scroll:** Automatically scrolls to the most recent message in the chat.

## Demo

You can check out a live demo of the application [coming soon].

## Technologies Used

- **React** - Front-end framework for building the user interface.
- **Supabase** - Backend service for handling database (messages) and real-time features.
- **Clerk** - User authentication service for secure sign-ins and user management.
- **SCSS** - CSS preprocessor used for styling.

## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (package manager)
- A Supabase account for database management
- A Clerk account for authentication

### 1. Clone the repository

```bash
git clone https://github.com/your-username/supachat.git
cd supachat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following variables:

```bash
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_key
CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
```

You can find these credentials in your Supabase and Clerk dashboards.

### 4. Run the app locally

```bash
npm start
```

This will start the React development server, and the application will be available at `http://localhost:3000`.

## How It Works

### Authentication with Clerk

The app uses Clerk for handling user sign-in and sign-out. When users visit the chat page, they must be signed in using their Clerk credentials. Once signed in, they are able to view their friends list and start chatting with other users.

### Supabase Integration

Supabase is used to manage user data (messages). Messages are stored in a Supabase database under the `Messages` table. The app fetches messages using Supabase queries and allows users to send new messages, which are inserted into the database.

### Real-Time Messaging

The app is built to show real-time messages between users. Whenever a message is sent, it is immediately displayed in the chat window, and the message history is updated in real-time.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Clerk** - For providing an easy-to-use authentication service.
- **Supabase** - For providing a powerful and open-source backend platform.
- **React** - For the framework that makes building UIs simple and efficient.

---

Happy chatting! 😊
