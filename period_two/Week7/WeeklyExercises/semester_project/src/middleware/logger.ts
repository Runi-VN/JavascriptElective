//Supplied (mostly)
import winston from "winston";
import * as expressWinston from "express-winston";
import path from "path"

//Always log to file
let requestLoggerTransports: Array<any> = [
    new winston.transports.File({ filename: path.join(process.cwd(), "logs", "all.log") })
]
let errorLoggerTransports: Array<any> = [
    new winston.transports.File({ filename: path.join(process.cwd(), "logs", "error.log") })
]

//In dev log to console
if (process.env.NODE_ENV !== 'production') {
    requestLoggerTransports.push(new winston.transports.Console());
    errorLoggerTransports.push(new winston.transports.Console());
}
let requestLogger = expressWinston.logger({
    transports: requestLoggerTransports,
    format: winston.format.combine(
        winston.format.colorize(), winston.format.json(), winston.format.prettyPrint()
    ),
    //msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    expressFormat: true,
    colorize: true,
})

let errorLogger = expressWinston.errorLogger({
    transports: errorLoggerTransports,
    format: winston.format.combine(
        winston.format.colorize(), winston.format.json()
    )
})
//Would be nice to customize console output (no time)
export { requestLogger, errorLogger };
