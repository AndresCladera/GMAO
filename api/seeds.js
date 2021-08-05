require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");
const Service = require("./models/Service");
const Guild = require("./models/Guild");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);


mongoose
    .connect(
        `mongodb+srv://${process.env.USER_BD}:${process.env.PASSWORD_BD}@${process.env.CLUSTER_NAME}.l6khd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("WE R ON BABYYY.");
    })
    .catch((error) => {
        console.log(error);
    });

let users = [
    {
        name: "Andres",
        lastname: "Cladera",
        phone: "MyPhone",
        company: "Andres Facility Management",
        companyMail: "test@test.com",
        password: "12345678900",
        textBox: "No hay comentarios adicionales",
        rol: "Admin",
        services: [],
        _id: "60c5fbdc8c3b2720a2e13641"
    },
    {
        name: "Eduardo",
        lastname: "El Alfa",
        phone: "His Phone",
        company: "Edu´s Dev-ops Outsourcing",
        companyMail: "test1@test.com",
        password: "4567891011",
        textBox: "No hay comentarios adicionales 123",
        rol: "Client",
        services: ["60c5fbdc8c3b2720a2e13644", "60c5fbdc8c3b2720a2e13645", "60c5fbdc8c3b2720a2e13646"],
        _id: "60c5fbdc8c3b2720a2e13642"
    },
    {
        name: "Santiago",
        lastname: "Light",
        phone: "His Phone",
        company: "Poland´s PETA",
        companyMail: "test2@test.com",
        password: "0987654321",
        textBox: "No hay comentarios adicionales 098",
        guild: "fontanería",
        rol: "Provider",
        services: ["60c5fbdc8c3b2720a2e13644", "60c5fbdc8c3b2720a2e13645", "60c5fbdc8c3b2720a2e13646"],
        _id: "60c5fbdc8c3b2720a2e13643"
    },
    {
        name: "Miguel",
        lastname: "Torres",
        phone: "His Phone",
        company: "La Casa Services",
        companyMail: "test3@test.com",
        password: "password10",
        textBox: "No hay comentarios adicionales 000",
        guild: "fontanería",
        rol: "Provider",
        services: [],
        _id: "60c5fbdc8c3b2720a2e13669"
    },
    {
        name: "Manuel",
        lastname: "Gonzalez",
        phone: "His Phone",
        company: "Acerca Facility",
        companyMail: "test4@test.com",
        password: "password11",
        textBox: "No hay comentarios adicionales 098",
        guild: "albañilería",
        rol: "Provider",
        services: [],
        _id: "60c5fbdc8c3b2720a2e13674"
    },
    // {
    //     name: "Jorge",
    //     lastname: "Carranza",
    //     phone: "His Phone",
    //     company: "Weird Facility",
    //     companyMail: "test5@test.com",
    //     password: "password12",
    //     textBox: "No hay comentarios adicionales 098",
    //     guild: "albañilería",
    //     rol: "Provider",
    //     services: [],
    //     _id: "60c5fbdc8c3b2720a2e1380"
    // },
    // {
    //     name: "José",
    //     lastname: "Camarasa",
    //     phone: "His Phone",
    //     company: "No Way Management",
    //     companyMail: "test6@test.com",
    //     password: "password13",
    //     textBox: "No hay comentarios adicionales 098",
    //     guild: "electricidad",
    //     rol: "Provider",
    //     services: [],
    //     _id: "60c5fbdc8c3b2720a2e13684"
    // },
    // {
    //     name: "Marcos",
    //     lastname: "Torrealba",
    //     phone: "His Phone",
    //     company: "Electrorrealba",
    //     companyMail: "test7@test.com",
    //     password: "password14",
    //     textBox: "No hay comentarios adicionales 098",
    //     guild: "electricidad",
    //     rol: "Provider",
    //     services: [],
    //     _id: "60c5fbdc8c3b2720a2e13635"
    // },
];

let services = [
    {
        date: "12/06/2021",
        company: "Edu´s Dev-ops Outsourcing",
        direction: "Calle Melendez Valdés 21",
        typeOfService: "fontaneria",
        description: "No sale agua del lavamanos",
        provider: "60c5fbdc8c3b2720a2e13643",
        _id: "60c5fbdc8c3b2720a2e13644",
        status: "Pending"

    },
    {
        date: "13/06/2021",
        company: "Edu´s Dev-ops Outsourcing",
        direction: "Calle Ramona 13",
        typeOfService: "electricidad",
        description: "No tenemos electricidad en la oficina",
        provider: "60c5fbdc8c3b2720a2e13643",
        _id: "60c5fbdc8c3b2720a2e13645",
        status: "Pending"

    },
    {
        date: "14/06/2021",
        company: "Edu´s Dev-ops Outsourcing",
        direction: "Avda. Fuencarral 125",
        typeOfService: "albanilería",
        description: "Tenemos un hueco en la pared",
        provider: "60c5fbdc8c3b2720a2e13643",
        _id: "60c5fbdc8c3b2720a2e13646",
        status: "Pending"

    },
];

let guilds = [
    {
        name: "fontanería"
    },
    {
        name: "albañilería"
    },
    {
        name: "electricidad"
    }
];

users.forEach((user) => {
    let hashPass = bcrypt.hashSync(user.password, salt);
    user.password = hashPass;
});

User.deleteMany()
    .then(() => {
        console.log(`Users deleted.`);
        return User.create(users);
    })
    .then((createdUsers) => {
        console.log(
            `${createdUsers.length} users have been created with the following names:`
        );
        createdUsers.forEach((user) => {
            console.log(user.name);
        });
    })
    .then(() => {
        Service.deleteMany()
            .then(() => {
                console.log(`Services deleted.`);
                return Service.create(services);
            })
            .then((createdServices) => {
                console.log(
                    `${createdServices.length} services have been created with the following id´s:`
                );
                createdServices.forEach((service) => {
                    console.log(service._id);
                });
            })
            .then(() => {
                Guild.deleteMany()
                    .then(() => {
                        console.log(`Guilds deleted.`);
                        return Guild.create(guilds);
                    })
                    .then((createdGuilds) => {
                        console.log(
                            `${createdGuilds.length} guilds have been added with the following id´s:`
                        );
                        createdGuilds.forEach((guild) => {
                            console.log(guild._id);
                        });
                    })
                    .then(() => {
                        mongoose.disconnect();
                        console.log("WE R OUT BABYY.");
                    })
                    .catch((error) => {
                        console.log("There is an error:");
                        console.log(error);
                    });
            })

    })
    .catch((error) => {
        console.log("There is an error:");
        console.log(error);
    });

