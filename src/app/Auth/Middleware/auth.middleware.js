import jwt from 'jsonwebtoken';

function renderVerifyAuth(req, res, next) {
    try {
        const hasToken = req.cookies.token;
        const accessKey = process.env.ACCESS_TOKEN_KEY;
        if (hasToken) {
            jwt.verify(hasToken, accessKey);
            return next();
        }
        return res.redirect('/login');
    } catch (error) {
        return res.redirect('/login');
    }
}

function renderNotVerifyAuth(req, res, next) {
    try {
        const hasToken = req.cookies.token;
        const accessKey = process.env.ACCESS_TOKEN_KEY;
        if (hasToken) {
            jwt.verify(hasToken, accessKey);
            return res.redirect('/');
        }
        return next();
    } catch (error) {
        return next();
    }
}

export default {
    renderVerifyAuth,
    renderNotVerifyAuth,
};
