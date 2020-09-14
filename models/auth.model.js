const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DB_URL = "mongodb+srv://Hany_Sabeh:H@Ny$@Be7@cluster0.i6gw8.mongodb.net/online-shop?retryWrites=true&w=majority";
const userSchema = mongoose.Schema({
    username: String,
    phonenumber: Number,
    address: String,
    email: String,
    password: String, 
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, phonenumber, address, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return User.findOne({ email: email })
            }).then(user => { 
                if (user) {
                    mongoose.disconnect();
                    reject("Email is already used")
                } else {
                    return bcrypt.hash(password, 10)
                }
            }).then(hashedPassword => {
                let user = new User({
                    username: username,
                    phonenumber: phonenumber,
                    address: address,
                    email: email,
                    password: hashedPassword
                });
                return user.save()
            }).then(() => {
                mongoose.disconnect();
                resolve()
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    });
};

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.findOne({ email: email }))
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject("There is no user matches this email");
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect();
                            reject("password is incorrect");
                        } else {
                            mongoose.disconnect();
                            resolve({
                                id: user.email,
                                isAdmin: user.isAdmin
                            });
                        }
                    });
                }
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getAllUu = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
        return User.find({}); 
        }).then(users => { mongoose.disconnect(); resolve(users);
        }).catch(err => { mongoose.disconnect(); reject(err); });
    });
};


