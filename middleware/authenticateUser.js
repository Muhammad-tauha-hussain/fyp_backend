module.exports = authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json({
            message: "User is not allowed"
        });
    }
    const verify = await jwt.decode(token, process.env.SECRET_KEY)
    req.user = verify;
    console.log(verify)
    next();
}


