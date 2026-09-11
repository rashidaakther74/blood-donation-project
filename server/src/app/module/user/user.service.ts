import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { IUpdateUser } from './user.interface';


const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: { id: true, name: true, email: true, phone: true, bloodGroup: true, location: true, isAvailable: true, createdAt: true },
    });
};

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, phone: true, bloodGroup: true, location: true, isAvailable: true, createdAt: true },
    });
    if (!user) throw new Error('User not found');
    return user;
};

const getMyProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, phone: true, bloodGroup: true, location: true, isAvailable: true, createdAt: true },
    });
    if (!user) throw new Error('User not found');
    return user;
};
const updateUser = async (id: string, payload: IUpdateUser) => {
    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
    }
    return await prisma.user.update({
        where: { id },
        data: payload,
        select: { id: true, name: true, email: true, phone: true, bloodGroup: true, location: true, isAvailable: true },
    });
};

const deleteUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id },
        select: { id: true, name: true, email: true },
    });
};

export const UserService = {
    getAllUsers,
    getUserById,
    getMyProfile,
    updateUser,
    deleteUser,
};