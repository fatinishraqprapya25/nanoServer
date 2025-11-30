const createRouter = () => {
    const routes = [];

    const _addRoute = (method, path, handler) => {
        routes.push({
            method,
            path,
            handler
        })
    }

    const matchRoute = (req) => {
        return routes.find(
            (r) => r.method === req.method && r.path === req.url
        )
    }

    return { _addRoute, matchRoute };
}

export default createRouter;