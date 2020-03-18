import jwt from 'jsonwebtoken';
import authService from '../Services/auth.service';

function verifyAuth(req, res, next) {
    const hasToken = req.cookies.token;
    const accessKey = process.env.ACCESS_TOKEN_KEY;
    if (hasToken) {
        const token = jwt.verify(hasToken, accessKey);
        console.log(token);
        return next();
    }
    return res.redirect('/login-email');
}

export default {
    verifyAuth,
};
