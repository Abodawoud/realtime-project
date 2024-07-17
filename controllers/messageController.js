import asyncHandler from 'express-async-handler';
import Message from '../models/messagesModel.js';
import User from '../models/userModel.js';

// @desc Create new message
// @route POST /api/v1/messages/
// @access Public
export const createMessage = asyncHandler(async (req, res) => {
  const { senderId, recipientId, content } = req.body; // Extract from request body
  const sender = await User.findById(senderId);
  const recipient = await User.findById(recipientId);
  if (!sender || !recipient) {
    res.status(404).json({ message: 'Sender or recipient not found' });
    return;
  }
  const message = new Message({
    sender: sender._id,
    recipient: recipient._id,
    content,
  });
  await message.save();
  res.status(201).json(message);
});

//@desc Get messages between sender and recipient
//@route GET /api/v1/messages/
//@access Public
export const getMessages = asyncHandler(async (req, res) => {
  const { senderId, recipientId } = req.query;

  try {
    // Find messages where senderId matches sender and recipientId matches recipient
    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    }).sort({ createdAt: 'asc' });

    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
