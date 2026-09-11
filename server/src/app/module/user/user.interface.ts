// src/app/module/user/user.interface.ts

import { BloodGroup } from '@prisma/client';

export interface IUpdateUser {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    bloodGroup?: BloodGroup;
    location?: string;
    isAvailable?: boolean;
}