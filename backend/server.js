// my-backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const { createClerkClient } = require('@clerk/backend');

// Load environment variables from .env file
dotenv.config();
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Initialize Express
const app = express();
const port = process.env.PORT || 5001; // Backend will run on port 5000 by default

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Example API route
app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.get('/api/get-clerk-users', async (req, res) => {
    try {
        // Fetch users from Clerk
        const users = await clerkClient.users.getUserList();

        // Send the user data as JSON
        res.status(200).json(users);
        console.log(users);
    } catch (error) {
        console.error('Error fetching users from Clerk:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
