import jwt from 'jsonwebtoken';

function verifyAuth(req, res, next) {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    // Add to request
    req.user = user;
    console.log(req.user);
    return next();
}

export default {
    verifyAuth,
};
