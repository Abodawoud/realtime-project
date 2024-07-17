import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

router
  .route('/')
  .post(messageController.createMessage)
  .get(messageController.getMessages);

export default router;
