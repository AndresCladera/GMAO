const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const salt = bcrypt.genSaltSync(10);

authRoutes.post("/signup", async (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const company = req.body.company;
    const phone = req.body.phone;
    const email = req.body.companyMail;
    const password = req.body.password;
    const rol = req.body.rol;

    if (!email || !password) {
        res.send({
            message: "please, fill the fields",
            token: null
        });
        return;
    }
    if (password.length < 10) {
        res.send({
            message: "you have to provide a password with at least 10 characters",
            token: null
        });
        return;
    }


    let foundUser = await User.findOne({ companyMail: email }).then(
        (repeatedEmail) => {
            return repeatedEmail;
        });
    if (foundUser != null) {
        res.send({
            message: "email is already on use",
            token: null
        });
        return;
    }

    const hashPassword = bcrypt.hashSync(password, salt);


    let newUser = await User.create({
        name: name,
        lastname: lastname,
        company: company,
        phone: phone,
        companyMail: email,
        password: hashPassword,
        rol: rol
    }).then((createdUser) => {
        return createdUser;
    }).catch((error) => {
        res.send(`we have the following errors ${error}`)
        return;
    });
    console.log(newUser);

    const token = jwt.sign({ id: newUser._id, rol: newUser.rol }, process.env.SECRET_WORD, { expiresIn: 25000000 })

    res.send({
        rol : newUser.rol,
        newToken: token,
        message: "the user has been created succesfully"
    });

})

authRoutes.post("/login", async (req, res) => {
    let companyMail = req.body.companyMail;
    let password = req.body.password;

    // const hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.findOne({
        companyMail: companyMail
    }).then((foundUser) => {
        console.log(foundUser);
        return foundUser;
    })
    if (!user) {
        res.send({
            message: "user not found or doesn´t exist",
            token: null,
        })
        return;
    }

    let passwordIsValid = await bcrypt.compare(password, user.password);
    if (passwordIsValid == false) {
        res.send({ 
            auth: false, 
            token: null, 
            message: "Incorrect password." });
        return;
    }


    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.SECRET_WORD, { expiresIn: 300000000 })

    res.send({
        newToken: token,
        rol : user.rol,
        message: `the user ${user.company} has been loged correctly`,
    });

})



module.exports = authRoutes;