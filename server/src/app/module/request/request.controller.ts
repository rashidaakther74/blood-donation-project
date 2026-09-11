import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestService } from './request.service';
import { BloodGroup } from '@prisma/client';

export const createBloodRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await RequestService.createRequest(req.body);

    return res.status(201).json({
        success: true,
        message: 'Emergency blood request created',
        data: result,
    });
});

export const getActiveRequests = catchAsync(async (_req: Request, res: Response) => {
    const result = await RequestService.getActiveRequests();

    return res.status(200).json({
        success: true,
        data: result,
    });
});

export const searchDonors = catchAsync(async (req: Request, res: Response) => {
    const filters = {
        bloodGroup: req.query.bloodGroup as BloodGroup,
        location: req.query.location as string,
    };

    const result = await RequestService.searchDonors(filters);

    return res.status(200).json({
        success: true,
        data: result,
    });
});