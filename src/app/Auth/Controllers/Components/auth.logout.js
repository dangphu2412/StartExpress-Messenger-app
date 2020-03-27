function logOut(req, res) {
    res.clearCookie('token');
    return res.status(200).json({
        message: 'Sign out success',
    });
}

export default logOut;
