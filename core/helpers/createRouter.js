const createRouter = () => {
    const routes = [];

    const addRoutes = (method, path, handler) => {
        routes.push({
            method,
            path,
            handler
        })
    }

    const matchRoutes = (req) => {
        return routes.find(
            (r) => r.method === req.method && r.path === req.url
        )
    }

    return { addRoutes, matchRoutes };
}

export default createRouter;