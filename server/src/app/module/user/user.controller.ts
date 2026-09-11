import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { UserService } from './user.service';


export const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
    const result = await UserService.getAllUsers();
    return res.status(200).json({
        success: true, message: 'Users retrieved successfully', data: result });
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getUserById(req.params.id as string);
    return res.status(200).json({
        success: true, message: 'User found successfully', data: result });
});
export const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id || (req as any).user?.userId;
    const result = await UserService.getMyProfile(userId);
    return res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        data: result,
    });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req.params.id as string, req.body);
    return res.status(200).json({ success: true, message: 'User updated successfully', data: result });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id as string);
    return res.status(200).json({ success: true, message: 'User deleted successfully', data: result });
});