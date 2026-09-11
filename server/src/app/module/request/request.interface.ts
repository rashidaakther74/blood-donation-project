import { BloodGroup, RequestStatus } from '@prisma/client';

export interface ICreateBloodRequest {
    requesterId: string;
    patientName: string;
    bloodGroup: BloodGroup;
    unitsNeeded?: number;
    hospitalName: string;
    location: string;
    contactPhone: string;
    urgency: string;
}

export interface IDonorSearchFilters {
    bloodGroup?: BloodGroup;
    location?: string;
}