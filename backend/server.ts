import cors from "cors";
import { config } from "./src/config/env";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { logger } from "./src/utils/logger";
import { timeStamp } from "node:console";


const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: config.NODE_ENV === 'production' ? 'https://your-production-domain.com' : "*",
    credentials: true
}));
app.use(
    rateLimit({
        windowMs: config.rateLimit.windowMs,
        max: config.rateLimit.max,
        message: {
            success: false,
            message: "Too many requests, please try again later."
        }
    })
)

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));


app.use((req, _res, next) => {
    logger.debug(`-> ${req.method} ${req.path}`)
    next()
});

app.get
    ('/health', (req, res) => {
        res.json({
            success: true,
            message: 'Server is running smoothly',
            env: config.NODE_ENV,
            timeStamp: new Date().toISOString()
        })
    })


app.use((req, res) => {
    res.status
        (404).json({
            success: false,
            message: 'Route not found'
        })
})