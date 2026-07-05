import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";
import { logger } from "../utils/logger";
import { prisma } from "../utils/prisma";

interface RegisterInput {
    email: string;
    password: string;
    phone: string;
    firstName: string
    lastName: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export const authService = {
    async register(input: RegisterInput) {
        const existing = await prisma.user.findFirst({
            where: { OR: [{ email: input.email }, { phone: input.phone }] }
        })
        if (existing) {
            if (existing.email === input.email) throw new Error('Email already registered')
            throw new Error('Phone already registered')
        }

        const passwordHash = await hashPassword(input.password);

        const user = await prisma.user.create({
            data: {
                email: input.email,
                passwordHash,
                phone: input.phone,
                firstName: input.firstName,
                lastName: input.lastName
            },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                role: true,
                isVerified: true
            }
        })

        const tokenPayload = {

            userId: user?.id,
            email: user?.email,
            role: user?.role

        };

        const accessToken = generateAccessToken(tokenPayload)
        const refreshToken = generateAccessToken(tokenPayload)

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7)

        await prisma.refreshToken.create({

            data: {
                userId: user.id,
                token: refreshToken,
                expiresAt
            }

        })

        logger.info(`New user is registered: ${user.email}`)
        return { user, accessToken, refreshToken }
    },

    async login(input: LoginInput) {

        const user = await prisma.user.findUnique({
            where: { email: input.email }
        })

        if (!user || !user.isActive) throw new Error('Invalid credentials')

        const isValidPassword = await comparePassword(input.password, user.passwordHash)

        if (!isValidPassword) throw new Error('Invalid credentials')

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role
        }

        const accessToken = generateAccessToken(tokenPayload)
        const refreshToken = generateAccessToken(tokenPayload)

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7)

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiresAt
            }
        })

        logger.info(`${user.email} is logged in`)
        return {
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isVerified: user.isVerified
            },
            accessToken,
            refreshToken
        }

    },

    async refreshToken(token: string) {
        const payload = verifyRefreshToken(token)

        const stored = await prisma.refreshToken.findUnique({
            where: { token }
        })
        if (!stored || stored.expiresAt < new Date()) {
            throw new Error('Invalid refresh token')
        }
        await prisma.refreshToken.delete({ where: { token } })
        const newAccessToken = generateAccessToken({
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        })

        const newRefreshToken = generateAccessToken({
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        })

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7)

        await prisma.refreshToken.create({
            data: {
                userId: payload.userId,
                token: newRefreshToken,
                expiresAt
            }
        })
        return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    },

    async logout(token: string) {
        await prisma.refreshToken.deleteMany({ where: { token } })
        logger.info('User logged out')
        return true
    }

}
