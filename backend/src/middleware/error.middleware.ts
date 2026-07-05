import { NextFunction , Request , Response } from "express"
import { logger } from "../utils/logger"
import { ZodError } from "zod"

export const errorMiddleware = (
    err:Error,
    req:Request,
    res:Response,
    _next:NextFunction
):void => {
    logger.error(`${req.method} ${req.path} - ${err.message}`,{
        stack:err.stack
    })

    if(err instanceof ZodError){
        const message = err.issues?.map((e) => `${e.path.join}`)
    }
}