const debug = require("debug")("game-project");

// function apiErrorHandler(err: any, req: any, res: any, next: any) {
//     debug('in apiError', err)
//     if (err.name === 'ApiError') {
//         debug('in apiError1');
//         res.status(err.errorCode).json(err);
//         return next()
//     }
//     debug('in apiError2');
//     next()
// };

function apiErrorHandler(err: any, req: any, res: any, next: Function) {
    if (err.name === "ApiError") {
        res.status(400).json({ code: err.errorCode, message: err.message })
    }
    next(err)
}

function apiPathErrorHandler(req: any, res: any, next: any) {
    if (req.originalUrl.startsWith('/api')) {
        res.status(404).json({ code: '404', msg: `API does not contain this endpoint: ${req.originalUrl}` });
        return next();
    }
    next();
};

export { apiErrorHandler, apiPathErrorHandler }