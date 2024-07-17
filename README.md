# Real-Time WhatsApp Clone

This project is a real-time chat application inspired by WhatsApp, built using Angular for the frontend, Node.js and Express for the backend server, MongoDB for the database, and Socket.IO for real-time communication.

### Features

- Real-time messaging between users
- Message storage in MongoDB
- Socket.IO integration for instant message delivery
- RESTful APIs for user and message handling

### Installation

#### Prerequisites

Before starting, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure MongoDB server is running)

#### Installing Dependencies

**Server Dependencies:**

1- Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2- Install dependencies:

```bash
npm install
```

3- Start the server --> Terminal 1:

```bash
node server.js
```

4- Running Client 1 --> Terminal 2:

```bash
node client1.js
```

5- Running Client 2 --> Terminal 3:

```bash
node client2.js
```

This will connect the client to the server and begin listening for messages.

### Client 1 Usage

- Client 1 sends messages to Client 2.
- Client 1 receives messages from Client 2.
- Messages sent by Client 1 are displayed as send successfully [client1name]: message.
- Messages received by Client 1 are displayed as received from [client2name]: message.

### Configuration

Ensure to replace senderId and recipientId in client1.js with actual user IDs before running.
