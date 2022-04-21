const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, res, next) => {

    // hatalar için custom error gerekli
    // token

    const { JWT_SECRET_KEY } = process.env;

    // 401 --> unauthorized , 403 --> forbidden
    if (!isTokenIncluded(req)) { // kullanıcı istenen formatta token göndermedi demektir
        return next(new CustomError("you're not authorized to access this route.", 401));
    }

    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("you're not authorized to access this route.", 401));
        }
        console.log(decoded);
        next();
    });
    
};

module.exports = {
    getAccessToRoute
};