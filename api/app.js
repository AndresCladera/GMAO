require("dotenv").config();
const { response } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const authRoutes = require("./routers/authentication");
const ClientRoutes = require("./routers/client");
const ProviderRoutes = require("./routers/provider");
const ServicesRoutes = require("./routers/services");
const cors = require("cors");

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", authRoutes);
app.use("/", ClientRoutes);
app.use("/", ProviderRoutes);
app.use("/", ServicesRoutes)

app.listen(3000, () => {
    console.log(`Server listening on port 3000.`);
});

