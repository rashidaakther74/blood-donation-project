import express, { Router } from 'express';
import { deleteUser, getAllUsers, getMyProfile, getUserById, updateUser } from './user.controller';
import { auth } from '../../middleware/auth';

const router: Router = express.Router();

router.get('/', auth(), getAllUsers);


router.get('/profile', auth(), getMyProfile);

router.get('/:id', auth(), getUserById);
router.patch('/:id', auth(), updateUser);
router.delete('/:id', auth(), deleteUser);

export const UserRoutes = router;