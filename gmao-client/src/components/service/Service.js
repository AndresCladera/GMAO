import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const { useState, useEffect } = React;


const Service = () => {
    let [info, setInfo] = useState({
        id: "",
        direction: "",
        description: "",
        providerCompany: "",
        providerGuild: "",
        serviceStatus: "",
        nextStatus: "",
        action: "",
        renderButton: false,
    });

    const nextStatus = (detail) => {
        let rol = window.localStorage.rol;
        if (rol === "Client" && detail.status === "Done") {
            setInfo({
                id: detail._id,
                direction: detail.direction,
                description: detail.description,
                providerCompany: detail.provider.company,
                providerGuild: detail.provider.guild,
                serviceStatus: detail.status,
                nextStatus: "Finished",
                action: "Confirm",
                renderButton: true,
            });
        } else if (rol === "Provider" && detail.status === "Pending") {
            setInfo({
                id: detail._id,
                direction: detail.direction,
                description: detail.description,
                providerCompany: detail.provider.company,
                providerGuild: detail.provider.guild,
                serviceStatus: detail.status,
                nextStatus: "Assigned",
                action: "Accept Service",
                renderButton: true,
            });

        } else if (rol === "Provider" && detail.status === "Assigned") {
            setInfo({
                id: detail._id,
                direction: detail.direction,
                description: detail.description,
                providerCompany: detail.provider.company,
                providerGuild: detail.provider.guild,
                serviceStatus: detail.status,
                nextStatus: "Done",
                action: "Executing Task",
                renderButton: true,
            });

        } else {
            setInfo({
                ...info,
                id: detail._id,
                direction: detail.direction,
                description: detail.description,
                providerCompany: detail.provider.company,
                providerGuild: detail.provider.guild,
                serviceStatus: detail.status,
                nextStatus: "",
                action: "",
            })
        }
    }

    let params = useParams();

    let history = useHistory();

    const getDetails = async () => {
        let detail = await fetch(`http://localhost:3000/service/${params.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: window.localStorage.token,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                return result;
            });


        return (detail);

    };
    const handleClick = async (event) => {
        event.preventDefault();
        console.log(info);
        if (window.localStorage.rol === "Provider") {


            await fetch(`http://localhost:3000/statusUpdate/${info.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: window.localStorage.token,
                },
                body: JSON.stringify({
                    status: info.nextStatus,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                });
        } else if (window.localStorage.rol === "Client") {
            await fetch(`http://localhost:3000/serviceFinishConfirm/${info.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: window.localStorage.token,
                },
                body: JSON.stringify({
                    status: info.nextStatus,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                });
        }
        history.push("/session");


    }

    useEffect(async () => {
        let detail = await getDetails();
        nextStatus(detail);
    }, []);

    if (info.direction === "") {
        return <div>Cargando...</div>;
    } else {
        return (
            <div className="p-8">
                <h1 className="text-2xl text-white font-extralight">Service {info.id}</h1>
                <div>
                    <h2 className="text-xl text-white font-extralight">Direction</h2>
                    <p className="p-8 text-white text-sm font-light">{info.direction}</p>
                </div>
                <div>
                    <h2 className="text-xl text-white font-extralight">Description</h2>
                    <p className="p-8 text-white text-sm font-light">{info.description}</p>
                </div>
                <div>
                    <h2 className="text-xl text-white font-extralight">Provider</h2>
                    <p className="p-8 text-white text-sm font-light">{info.providerCompany}</p>
                </div>
                <div>
                    <h2 className="text-xl text-white font-extralight">Guild</h2>
                    <p className="p-8 text-white text-sm font-light">{info.providerGuild}</p>
                </div>
                <div>
                    <h2 className="text-xl text-white font-extralight">Status</h2>
                    <p className="p-8 text-white text-sm font-light">{info.serviceStatus}</p>
                </div>
                {info.renderButton === true ? <div>
                    <button className="text-white" onClick={handleClick}>{info.action}</button>
                </div> : <div></div>}

                <Link className="text-xl text-white font-extralight" to="/session">Back to Services</Link><br></br>
            </div>

        );
    }

}



export default Service;