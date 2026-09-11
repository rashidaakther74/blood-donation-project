import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(req.body);
    return res.status(201).json({ success: true, message: 'User registered successfully', data: result });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    return res.status(200).json({ success: true, message: 'User logged in successfully', data: result });
});