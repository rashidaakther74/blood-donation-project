import { prisma } from '../../lib/prisma';
import { ICreateBloodRequest, IDonorSearchFilters } from './request.interface';

const createRequest = async (payload: ICreateBloodRequest) => {
    const result = await prisma.bloodRequest.create({
        data: {
            ...payload,
            unitsNeeded: payload.unitsNeeded || 1,
        },
    });
    return result;
};

const getActiveRequests = async () => {
    const result = await prisma.bloodRequest.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
        include: {
            requester: {
                select: {
                    name: true,
                    phone: true,
                },
            },
        },
    });
    return result;
};

const searchDonors = async (filters: IDonorSearchFilters) => {
    const { bloodGroup, location } = filters;

    const result = await prisma.user.findMany({
        where: {
            bloodGroup: bloodGroup || undefined,
            isAvailable: true,
            location: location
                ? {
                    contains: location,
                    mode: 'insensitive',
                }
                : undefined,
        },
        select: {
            id: true,
            name: true,
            phone: true,
            bloodGroup: true,
            location: true,
            isAvailable: true,
        },
    });
    return result;
};

export const RequestService = {
    createRequest,
    getActiveRequests,
    searchDonors,
};