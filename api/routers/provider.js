const express = require("express");
const providerRoutes = express.Router();
const tokenValidation = require("../functions/tokenValidation");

const Provider = require("../models/User");
const Service = require("../models/Service");


providerRoutes.get("/providerHome", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Provider");
    if (!user) {
        return;
    }
    res.send({
        user: user,
        auth: true,
        message: "Provider´s login has been successfull"
    });
});

providerRoutes.post("/updateProvider/:idProvider", async (req, res) => {
    let id = req.params.idProvider;
    let providerName = req.body.name;
    let providerLastname = req.body.lastname;
    let providerPhone = req.body.phone;
    let providerCompany = req.body.company;
    let providerCompanyMail = req.body.companyMail;
    // let providerPassword = req.body.password;
    await Provider.findByIdAndUpdate(id, {
        name: providerName,
        lastname: providerLastname,
        phone: providerPhone,
        company: providerCompany,
        companyMail: providerCompanyMail,
        // password: providerPassword,
    })
        .then((updatedProvider) => {
            res.redirect(`/providerHome`)
        })
        .catch((error) => {
            res.send(error);
        });
    //     console.log({providerUpdate});
    // res.redirect(`/providerHome/${id}`);
});

providerRoutes.delete("/deleteProvider/:idProvider", async (req, res) => {
    let id = req.params.idProvider;
    let provider = await Provider.findByIdAndDelete(id).then((deletedProvider) => {
        return deletedProvider;
    });
    res.send({
        message:`the provider ${provider.company} has been succesfully deleted`
    });
});

providerRoutes.get("/providerService/:idService", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Provider");
    if (!user) {
        return;
    }
    let id = req.params.idService;
    let service = await Service.findById(id)
        .then((foundService) => {
            return foundService;
        })
    res.send(service);
})

providerRoutes.put("/statusUpdate/:idService", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Provider");
    if (!user) {
        return;
    }
    let id = req.params.idService;
    let serviceStatus = req.body.status;
    await Service.findByIdAndUpdate(id, {
        status: serviceStatus
    })
        .then((updatedService) => {
        }).catch((error) => {
            res.send(error);
        });
    // Provider.findByIdAndUpdate(user._id, { $push: { services: service._id } })
    //     .then((updatedUserWithService) => {
    //     });
    res.send({
         message: "ruta terminada"});
})


module.exports = providerRoutes;

