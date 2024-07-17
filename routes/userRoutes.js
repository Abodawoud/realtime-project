import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(userController.createUser).get(userController.getUsers);
router.route('/:id').get(userController.getUserById);

export default router;
