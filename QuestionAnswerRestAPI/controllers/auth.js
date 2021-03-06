const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const { validateUserInput, comparePassword } = require("../helpers/input/inputHelpers");

const register = asyncErrorWrapper(async (req, res, next) => {
    // POST DATA
    const { name, email, password, role } = req.body;

    // async , await
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {

    const { email, password } = req.body;

    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please check your input.", 400))
    }

    const user = await User.findOne({email}).select("+password");
    
    if(!comparePassword(password,user.password)){
        return next(new CustomError("Please check your credentials.",400));
    }

    sendJwtToClient(user, res);
});

// token silindi ve logout işlemi yapıldı.
const logout = asyncErrorWrapper(async (req, res, next) => {

    const {NODE_ENV} = process.env;

    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success: true,
        message: "Logout successful"
    })
});

const getUser = (req, res, next) => {

    res.json({
        succes: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    });  
}

// Forgot Password
const forgotPassword = asyncErrorWrapper(async (req,res,next) => {

    const resetEmail = req.body.email;
    const user = await user.findOne({email : resetEmail});

    if (!user) {
        return next(new CustomError("There is no user with that email.",400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    
    await user.save();

    res.json({
        success: true,
        message: "token sent to your email."
    })
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    forgotPassword
}