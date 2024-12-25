const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json(
        {
            success : false,
            message : err.message  || "server is not working"
        }
    )
    
} 

export default errorHandler;