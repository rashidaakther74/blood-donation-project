import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { IRegisterUser, ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const registerUser = async (payload: IRegisterUser) => {
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email: payload.email }, { phone: payload.phone }] },
    });

    if (existingUser) {
        throw new Error('Email or Phone already exists');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    return await prisma.user.create({
        data: { ...payload, password: hashedPassword },
        select: { id: true, name: true, email: true, phone: true, bloodGroup: true, location: true, isAvailable: true, createdAt: true },
    });
};

const loginUser = async (payload: ILoginUser) => {
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const jwtPayload = {
        id: user.id,
        email: user.email,
    };

    const accessToken = jwt.sign(
        jwtPayload,
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );

    const { password, ...userWithoutPassword } = user;
    return {
        accessToken,
        user: userWithoutPassword
    };
};

export const AuthService = {
    registerUser,
    loginUser,
};