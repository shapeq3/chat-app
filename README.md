# Chat App

A simple real-time chat application built with Node.js, Express, and Socket.io.

## Features

- Real-time messaging using WebSockets
- Logo-based landing page
- Clean and responsive UI
- Multi-user chat support

## Project Structure

```
chat-app/
├── public/
│   ├── index.html        # Landing page
│   ├── chat.html         # Chat interface
│   ├── style.css         # Styling
│   ├── chat.js           # Client-side logic
│   └── logo.png          # App logo
├── server.js             # Backend server
├── package.json          # Dependencies
└── README.md             # This file
```

## Installation

1. Navigate to the project directory:
   ```bash
   cd chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

- Visit the landing page with the logo
- Click "Start Chatting" to enter the chat room
- Type messages and press Send or Enter to share
- Messages appear in real-time for all connected users

## Technologies Used

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: HTML5, CSS3, JavaScript
- **Communication**: WebSockets (Socket.io)

## License

ISC
