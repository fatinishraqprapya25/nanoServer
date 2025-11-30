const createMiddlewareRunner = (middlewares, matchRoute) => (req, res) => {
    let index = 0;
    const next = (err) => {
        if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error!");
        }
        const middleware = middlewares[index++];
        if (!middleware) {
            const route = matchRoute(req);
            if (route) return route.handler(req, res);
            res.statusCode = 404;
            return res.end("Not Found!");
        }

        try {
            middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    }

    next();
}

export default createMiddlewareRunner;