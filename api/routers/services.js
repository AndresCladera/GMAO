const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const User = require("../models/User");

router.get("/services", async (req, res) => {
  let services = await Service.find().then((servicesFound) => {
    return servicesFound;
  });
  res.send(services);
});

router.get("/service/:idService", async (req, res) => {
  let id = req.params.idService;
  let service = await Service.findById(id).populate("provider")
    // .then((foundService) => {
    //   return foundService;
    // })
    // .catch((error) => {
    //   res.send(error);
    // });
  res.send(service);
});

router.post("/newService", async (req, res) => {
  let serviceDate = req.body.date;
  let serviceCompany = req.body.company;
  let serviceDirection = req.body.direction;
  let serviceTypeOfService = req.body.typeOfService;
  let serviceDescription = req.body.description;
  let serviceProvider = req.body.provider;
  let serviceID = req.body._id;
  let serviceStatus = req.body.status;
  let service = await Service.create({
    date: serviceDate,
    company: serviceCompany,
    direction: serviceDirection,
    typyOfService: serviceTypeOfService,
    description: serviceDescription,
    provider: serviceProvider,
    _id: serviceID,
    status: serviceStatus,
  })
    .then((newService) => {
      return newService;
    })
    .catch((error) => {
      res.send(error);
    });
  let id = service._id;
  res.redirect(`/service/${id}`);
});

router.put("/updateService/:idService", async (req, res) => {
  let id = req.params.idService;
  let serviceDate = req.body.date;
  let serviceCompany = req.body.company;
  let serviceDirection = req.body.direction;
  let serviceTypeOfService = req.body.typeOfService;
  let serviceDescription = req.body.description;
  let serviceProvider = req.body.provider;
  let serviceID = req.body._id;
  let serviceStatus = req.body.status;
  await Service.findByIdAndUpdate(id,{
    date: serviceDate,
    company: serviceCompany,
    direction: serviceDirection,
    typyOfService: serviceTypeOfService,
    description: serviceDescription,
    provider: serviceProvider,
    _id: serviceID,
    status: serviceStatus,
  })
    .then(() => {})
    .catch((error) => {
      res.send(error);
    });
  res.redirect(`/service/${id}`);
});
router.put("/addProvider/:serviceId/:providerId", async (req, res) =>{
  let idService = req.params.serviceId;
  let idProvider = req.params.providerId;
  await Service.findByIdAndUpdate(idService, {
    $push:{provider:idProvider}
  }).then((service)=>{
  })
  let provider = await User.findByIdAndUpdate(idProvider, {
    $push:{services:idService}
  }).then((provider)=>{
    return (provider)
  })
  res.send({
    provider: provider
  })

});

router.delete("/deleteService/:idService", async (req, res) => {
  let id = req.params.idService;
  let service = await Service.findByIdAndDelete(id).then((deletedService) => {
    return deletedService;
  });
  res.send(service);
});

module.exports = router;