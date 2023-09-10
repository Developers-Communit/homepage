
const verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.redirect('/login');
    }

    return next();
}


module.exports = { verifyToken };