import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import dbConnection from './config/dbConnection.js';
import Message from './models/messagesModel.js';

await dbConnection();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use(errorHandler);

const userSocketMap = new Map();

io.on('connection', (socket) => {
  const { senderId } = socket.handshake.query;

  console.log(`Socket connected: ${socket.id} for user: ${senderId}`);

  userSocketMap.set(senderId, socket.id);

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    userSocketMap.delete(senderId);
  });

  socket.on('chat message', async (data) => {
    const { senderId, recipientId, content } = data;

    try {
      const message = new Message({
        sender: senderId,
        recipient: recipientId,
        content: content,
      });
      await message.save();

      console.log('Message saved to MongoDB:', message);

      const messageData = {
        senderId,
        recipientId,
        content,
        createdAt: message.createdAt,
      };

      // Emit message to sender
      socket.emit('chat message', messageData);

      // Emit message to recipient (if online)
      const recipientSocketId = userSocketMap.get(recipientId);
      if (recipientSocketId && recipientSocketId !== socket.id) {
        io.to(recipientSocketId).emit('chat message', messageData);
      }
    } catch (err) {
      console.error('Error saving message to MongoDB:', err);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
