const mongoose = require("mongoose");

// parola hashlemek için kullanılan kütüphane
const bcrypt = require("bcryptjs");
// jwt dahil edildi
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email."
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: [true, "Please provide a password"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }
});

// UserSchema Methods
UserSchema.methods.generateJwtFromUser = function(){
    
    // .env'den token key ve geçerlilik süresi alındı.
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;

    const payload = {
        id : this._id,
        name : this.name
    };

    const token = jwt.sign(payload,JWT_SECRET_KEY, {
        expiresIn : JWT_EXPIRE
    });

    return token;
}


// pre hooks ile işlem yapılmadan hemen önce istenilen görevler gerçekleştiriliyor. temel mantık bu.
// kullanıcı eklenmeden hemen önce parolasını hashlemek.
UserSchema.pre("save", function (next) {

    // parola değişmemişse burayı güncelleme

    // isModified --> içine konulan değer değişmişse true, değişmemişse false döner.
    if(!this.isModified("password")) {
        next();
    }

    // burada arrow function kullanmazsan this ifadesi kullanıcıyı göstermiyor. bind durumundaki gibi.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    })
});


module.exports = mongoose.model("User", UserSchema);