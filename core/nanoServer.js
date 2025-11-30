import http from "http";

function NanoServer() {
    const middlewares = [];
    const routes = [];

    const use = (middleware) => {
        middlewares.push(middleware);
    }

    const _addRoute = (method, path, handler) => {
        routes.push({
            method,
            path,
            handler
        })
    }

    const get = (path, handler) => {
        _addRoute("GET", path, handler);
    }

    const post = (path, handler) => {
        _addRoute("POST", path, handler);
    }

    const put = (path, handler) => {
        _addRoute("PUT", path, handler);
    }

    const _delete = (path, handler) => {
        _addRoute("DELETE", path, handler);
    }

    const matchRoute = (req) => {
        return routes.find(
            (r) => r.method === req.method && r.path === req.url
        )
    }

    const runMiddlewares = (req, res) => {
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

    const start = (port) => {
        const server = http.createServer(runMiddlewares);
        server.listen(port, console.log("Server listening at port, ", port));
    }

    return {
        use,
        get,
        put,
        post,
        delete: _delete,
        start
    }

}

export default NanoServer;