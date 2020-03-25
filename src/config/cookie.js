const cookieOptions = {
    maxAge: process.env.COOKIE_EXPIRES,
    httpOnly: true,
};

export default cookieOptions;
