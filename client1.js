import readline from 'readline';
import { io } from 'socket.io-client';

const senderId = '6697d92e41c47e0da1b66711'; // Replace with actual sender ID
const recipientId = '6697fa0a6b42352400da1735'; // Replace with actual recipient ID

const socket = io(`http://localhost:8000?senderId=${senderId}`);

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('chat message', (data) => {
  if (data.senderId !== senderId) {
    console.log(`Message received from ${data.senderId}: ${data.content}`);
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const messageContent = input.trim();
  if (messageContent) {
    socket.emit('chat message', {
      senderId,
      recipientId,
      content: messageContent,
    });
  }
});
