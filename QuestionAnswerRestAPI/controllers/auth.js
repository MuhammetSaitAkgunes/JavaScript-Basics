const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const register = async (req, res, next) => {
    // POST DATA
    const name = "Muhammet Sait Akgunes";
    const email = "msakgunesasdfasdf.com";
    const password = "123456"

    try {
        // async , await
        const user = await User.create({
            name,
            email,
            password
        });

        res
        .status(200)
        .json({
            succes: true,
            data: user
        });
    }
    catch (err) {
        return next(err);
    }

};

const errorTest = (req, res, next) => {
    return next(new TypeError("Syntax Error"));
}

module.exports = {
    register,
    errorTest
}