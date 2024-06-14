export const errorMiddleware = (err, req, res, next) => {
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message,
    });
};
export const TryCatch = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
