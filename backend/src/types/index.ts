

export interface AuthenticateRequest extends Request {

    user?: {
        userId: string
        email: string
        role: string
    }

}

export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export const sendSuccess = <T>(
    res: import("express").Response,
    message: string,
    data: T,
    statusCode = 200,
) => {
    const response: ApiResponse<T> = { success: true, message, data };
    return res.status(statusCode).json(response)
}

export const sendError = (
    res: import("express").Response,
    message: string,
    error?: string,
    statusCode = 400,
) => {
    const response: ApiResponse = { success: false, message, error }
    return res.status(statusCode).json(response)
}