import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { authService } from "../services/auth.service";
import { sendError, sendSuccess } from "../types/index";
import { logger } from "../utils/logger";

const registerSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be a valid 10-digit number"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const authController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const input = registerSchema.parse(req.body)
            const result = await authService.register(input);
            sendSuccess(res, 'User registered successfully', result, 201);
        } catch (error) {
            if (error instanceof Error && error.message.includes('already registered')) {
                sendError(res, error.message, undefined, 400);
                return
            }
            next(error);
        }
    },
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const input = loginSchema.parse(req.body);
            const result = await authService.login(input);
            logger.info("User logged in successfully", { email: input.email });
            sendSuccess(res, 'Login successful', result, 200);
        } catch (error) {
            if (error instanceof Error && error.message.includes('Invalid credentials')) {
                sendError(res, 'Invalid credentials', undefined, 401);
                return
            }
            next(error);
        }
    },
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = z.object({ refreshToken: z.string() }).parse(req.body)
            const result = await authService.refreshToken(refreshToken);
            sendSuccess(res, 'Token refreshed successfully', result, 200);
        }
        catch (err) {
            next(err)
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = z.object({ refreshToken: z.string() }).parse(req.body)
            await authService.logout(refreshToken);
            sendSuccess(res, 'Logout successful', undefined, 200);
        } catch (error) {
            next(error);
        }
    }
}