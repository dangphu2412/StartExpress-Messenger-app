import jwt from 'jsonwebtoken';

function verifyAuth(req, res, next) {
    try {
        const header = req.headers['authorization'];
        const token = header.split(' ')[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

        // Add to request
        req.user = user;
        console.log(req.user);
        return next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message: 'Unauthorized',
        });
    }
}

export default {
    verifyAuth,
};
