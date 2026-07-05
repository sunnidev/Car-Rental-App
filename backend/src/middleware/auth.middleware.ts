import { NextFunction, Response } from 'express';
import { AuthenticateRequest, sendError } from '../types/index';
import { verifyAccessToken } from '../utils/jwt';

export const authenticate = (
    req:AuthenticateRequest,
    res:Response,
    next:NextFunction
):void => {
    const authHeader = req.headers?.authorization;
    if(!authHeader?.startsWith('Bearer ')){
        sendError(res, 'Invalid Authorization header', undefined, 401)
        return
    }

    const token = authHeader.split(" ")[1]
    try {
        const payload = verifyAccessToken(token)
        req.user = payload
        next()
    } catch (error) {
        next(error)
    }
}

export const requireAdmin = (
    req:AuthenticateRequest,
    res:Response,
    next:NextFunction
): void => {
    if(req.user?.role !== 'ADMIN'){
        sendError(res, 'Forbidden: Admin access require ', undefined, 403)
        return
    }
    next()
}