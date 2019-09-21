const verifyAuth = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/login');
};
const notverifyAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return next();
}
module.exports = { verifyAuth, notverifyAuth };
