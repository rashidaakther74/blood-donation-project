import { BloodGroup } from '@prisma/client';

export interface IRegisterUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    bloodGroup: BloodGroup;
    location: string;
}

export interface ILoginUser {
    email?: string;
    phone?: string;
    password: string;
}

export interface IToggleAvailability {
    userId: string;
    isAvailable: boolean;
}