const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/users", async (req, res) => {
    let users = await User.find().then((usersFound) => {
        return usersFound;
    });
    res.send(users);
});

router.get("/user/:idUser", async (req, res) => {
    let id = req.params.idUser;
    let user = await User.findById(id)
        .then((foundUser) => {
            return foundUser;
        })
        .catch((error) => {
            res.send(error);
        });
    res.send(user);
});

router.post("/newUser", async (req, res) => {
    let userName = req.body.name;
    let userLastname = req.body.lastname;
    let userPhone = req.body.phone;
    let userCompany = req.body.company;
    let userCompanyMail = req.body.companyMail;
    let userPassword = req.body.password;
    let userTextBox = req.body.textBox;
    let userRol = req.body.rol;
    let user = await User.create({
        name: userName,
        lastname: userLastname,
        phone: userPhone,
        company: userCompany,
        companyMail: userCompanyMail,
        password: userPassword,
        textBox: userTextBox,
        rol: userRol,
    })
        .then((newUser) => {
            return newUser;
        })
        .catch((error) => {
            res.send(error);
        });
    let id = user._id;
    res.redirect(`/user/${id}`);
});

router.put("/updateUser/:idUser", async (req, res) => {
    let id = req.params.idUser;
    let userName = req.body.name;
    let userLastname = req.body.lastname;
    let userPhone = req.body.phone;
    let userCompany = req.body.company;
    let userCompanyMail = req.body.companyMail;
    let userPassword = req.body.password;
    let userTextBox = req.body.textBox;
    let userRol = req.body.rol;
    await User.findByIdAndUpdate(id, {
        name: userName,
        lastname: userLastname,
        phone: userPhone,
        company: userCompany,
        companyMail: userCompanyMail,
        password: userPassword,
        textBox: userTextBox,
        rol: userRol,
    })
        .then(() => { })
        .catch((error) => {
            res.send(error);
        });
    res.redirect(`/user/${id}`);
});

router.delete("/deleteUser/:idUser", async (req, res) => {
    let id = req.params.idUser;
    let user = await User.findByIdAndDelete(id).then((deletedUser) => {
        return deletedUser;
    });
    res.send(user);
});

module.exports = router;