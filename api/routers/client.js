const express = require("express");
const clientRoutes = express.Router();
const tokenValidation = require("../functions/tokenValidation");

const Client = require("../models/User");
const Service = require("../models/Service");

clientRoutes.get("/clientHome", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
    if (!user) {
        return;
    }
    res.send({
        user: user,
        auth: true
    });
});

// clientRoutes.get("/testReact", async (req, res)=>{
//     res.send({
//         message:"testFrase"}
//         );
// });


clientRoutes.post("/serviceRequest", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
    if (!user) {
        return;
    }
    console.log(req.body.client);
    let serviceDate = req.body.date;
    let serviceClient = req.body.client;
    let serviceDirection = req.body.direction;
    let serviceTypeOfService = req.body.typeOfService;
    let serviceDescription = req.body.description;
    let service = await Service.create({
        date: serviceDate,
        company: serviceClient,
        direction: serviceDirection,
        typeOfService: serviceTypeOfService,
        description: serviceDescription,
        status: "Pending"
    })
        .then((newService) => {
            return newService;
        })
        .catch((error) => {
            res.send(error);
        });
    Client.findByIdAndUpdate(user._id, { $push: { services: service._id } })
        .then((updatedUserWithService) => {
        });


    res.send({
        service: service,
        auth: true
    })

});

clientRoutes.get("/clientService/:idService", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
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


clientRoutes.post("/updateService/:idService", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
    if (!user) {
        return;
    }
    let id = req.params.idService
    let serviceDate = req.body.date;
    let serviceClient = req.body.company;
    let serviceDirection = req.body.direction;
    let serviceTypeOfService = req.body.typeOfService;
    let serviceDescription = req.body.description;
    let serviceStatus = req.body.status;
    await Service.findByIdAndUpdate(id, {
        date: serviceDate,
        company: serviceClient,
        direction: serviceDirection,
        typeOfService: serviceTypeOfService,
        description: serviceDescription,
        status: serviceStatus
    })
        .then((updatedService) => {
            res.redirect(`/clientService/${id}`);;
        })
        .catch((error) => {
            res.send(error);
        });
    // Client.findByIdAndUpdate(user._id, { $push: { services: service._id } })
    //     .then((updatedUserWithService) => {
    //     });

})
clientRoutes.post("/assignProvider/:guild", async (req, res) => {
    let guild = req.params.guild;
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
    if (!user) {
        return;
    }
    let providers = await Client.find({ guild: guild })
        .then((foundProviders) => {
            return foundProviders;

        })
    res.send({
        providers: providers,
        message: "list of providers"
    });
})

clientRoutes.post("/updateClient/:idClient", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
    if (!user) {
        return;
    }
    let id = req.params.idClient
    let userName = req.body.name;
    let userLastname = req.body.lastname;
    let userPhone = req.body.phone;
    let userCompany = req.body.company;
    let userCompanyMail = req.body.companyMail;
    // let userPassword = req.body.password;
    await Client.findByIdAndUpdate(id, {
        name: userName,
        lastname: userLastname,
        phone: userPhone,
        company: userCompany,
        companyMail: userCompanyMail,
        // password: userPassword,
    })
        .then((updatedClient) => {
            res.redirect("/clientHome");
        })
        .catch((error) => {
            res.send(error);
        });

});

clientRoutes.delete("/deleteClient", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
    if (!user) {
        return;
    }
    let id = user._id
    let client = await Client.findByIdAndDelete(id).then((deletedUser) => {
        return deletedUser;
    });
    res.send({
        message: `the client ${client.company} has been succesfully deleted`
    });
});

clientRoutes.put("/serviceFinishConfirm/:idService", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "Client");
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


module.exports = clientRoutes;