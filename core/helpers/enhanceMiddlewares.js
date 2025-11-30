const enhanceMiddleware = (req, res, next) => {
    res.status = (code) => {
        res.statusCode = code;
        return res;
    }
    res.json = (data) => {
        res.setHeader("Content-Type", "Application/json");
        res.end(JSON.stringify(data));
    };

    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });

    req.on("end", () => {
        if (data !== "") {
            try {
                const parsedData = JSON.parse(data);
                req.body = parsedData;
                next();
            } catch (err) {
                next("Error Message");
            }
        }
    });

}

export default enhanceMiddleware;