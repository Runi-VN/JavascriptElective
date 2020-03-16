const simpleLogger = (req: any, res: any, next: any): any => {
    console.log({ 'Time received': new Date(), "Method": req.method, "URL": req.url });
    next();
};

module.exports.simpleLogger = simpleLogger