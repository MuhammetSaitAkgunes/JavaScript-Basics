const bcrypt = require("bcryptjs");

// kullanıcı hem email hem de password girmiş mi kontrol eder. 
const validateUserInput = (email, password) => {
    // email ve password varsa true döner.
    return email && password;
};

// hashlenmiş ve ilk hali uyumluysa true döner.
const comparePassword = (password,hashPassword) => {
    return bcrypt.compareSync(password,hashPassword);
}

module.exports = {
    validateUserInput,
    comparePassword
}