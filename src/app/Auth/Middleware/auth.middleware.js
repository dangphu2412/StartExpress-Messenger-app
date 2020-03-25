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

function verifyAuth(req, res, next) {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log(user);
    return next();
}

export default {
    renderVerifyAuth,
    verifyAuth,
};
