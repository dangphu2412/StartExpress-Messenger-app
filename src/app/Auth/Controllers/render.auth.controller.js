function registerPage(req, res) {
    return res.render('app/auth/register');
}
function registerEmail(req, res) {
    return res.render('app/auth/register-email');
}
function registerPhone(req, res) {
    return res.render('app/auth/register-phone-number');
}
function loginPage(req, res) {
    return res.render('app/log/login');
}
function loginEmail(req, res) {
    return res.render('app/log/login-email');
}
function loginPhone(req, res) {
    return res.render('app/log/login-phone-number');
}
function resetPassword(req, res) {
    return res.render('app/reset-password');
}
export default {
    registerPage,
    registerEmail,
    registerPhone,
    loginPage,
    loginEmail,
    loginPhone,
    resetPassword,
};
