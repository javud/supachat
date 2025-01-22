# Supachat React App

<img width="720" alt="image (11)" src="https://github.com/user-attachments/assets/68967550-a18f-457b-82d8-b91f0cd379ea" />


Supachat is a modern chat application built using **React**. The app enables users to chat with their friends, view message history, and easily send real-time messages.

This project uses Supabase for database management (storing messages), Clerk for user authentication, and React for the front-end.

NOTE: This project is still in development. As of now, no public release is available.

## Features (so far)

- **User Authentication:** Users can sign in/out using Clerk authentication.
- **User List:** Displays a list of available friends to chat with.
- **Real-Time Messaging:** Users can send and receive messages with their friends.
- **Message History:** Displays a history of messages between the logged-in user and their selected friend.
- **Responsive UI:** Designed for both desktop and mobile devices.
- **Auto-scroll:** Automatically scrolls to the most recent message in the chat.

## Demo

You can check out a live demo of the application at: [coming soon].

## Technologies Used

- **React** - Frontend framework for building the user interface.
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
