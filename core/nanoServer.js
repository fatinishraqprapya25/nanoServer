import http from "http";
import createRouter from "./helpers/createRouter.js";
import createMiddlewareRunner from "./helpers/runMiddlewares.js"

const NanoServer = () => {
    const middlewares = [];

    const { addRoutes, matchRoutes } = createRouter;
    const runMiddlewares = createMiddlewareRunner(middlewares, matchRoutes);

    return {
        use: (middleware) => middlewares.push(middleware),
        get: (path, handler) => addRoutes("GET", path, handler),
        post: (path, handler) => addRoutes("POST", path, handler),
        put: (path, handler) => addRoutes("PUT", path, handler),
        delete: (path, handler) => addRoutes("DELETE", path, handler),
        start: (port) => {
            const server = http.createServer(runMiddlewares);
            server.listen(port, () => {
                console.log(`Server listening at port, ${port}`);
            });
        }
    }

}

export default NanoServer;