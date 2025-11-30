const enhanceMiddleware = (req, res, next) => {
    res.status = (code) => {
        res.statusCode = code;
        return res;
    }
    res.json = (data) => {
        res.setHeader("Content-Type", "Application/json");
        res.end(JSON.stringify(data));
    };

    next();
}

export default enhanceMiddleware;