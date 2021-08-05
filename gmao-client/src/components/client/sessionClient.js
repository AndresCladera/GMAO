import React from "react";
import "./sessionClient.css";
import { Link } from "react-router-dom";
import Logout from "../forms/logout";
const { useState, useEffect } = React;

const SessionClient = () => {
  let [info, setInfo] = useState({
    name: "",
    company: "",
    services: [],
    auth: false,
    loaded: false
  });

  const getClient = async () => {
    let responseFromGet = await fetch("http://localhost:3000/clientHome", {
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
      // console.log(responseFromGet);
    if (responseFromGet.auth === true) {
      setInfo({
        ...info,
        name: responseFromGet.user.name,
        company: responseFromGet.user.company,
        services: responseFromGet.user.services,
        loaded: true,
        auth: true
      });
    } else if (responseFromGet.auth === false) {
      setInfo({
        ...info,
        loaded: true
      });

    }

  };

  useEffect(() => {
    getClient();
  }, []);

  if (info.loaded === false) {
    return <div>Cargando...</div>;
  } else {
    if (info.auth === true) {
      return (
        <div className="p-8">
          <h1 className="text-2xl text-white font-extralight">Welcome {info.name}</h1>
          <h2 className=" text-2xl text-white font-extralight">Services</h2>
          <table className="services-container">
            <tbody>
              {info.services.map((service) => {
                return (
                  <tr key={service._id} className="service-container">
                    <td>{service.date}</td>
                    <td>{service.typeOfService}</td>
                    <td>{service.company}</td>
                    <td>{service.direction}</td>
                    <td>{service.status}</td>
                    <td className="text-red-600 text-base"><Link to={`/service/${service._id}`}>details</Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Link className="text-2xl text-white font-extralight" to="/logout">Logout</Link><br></br>
          <Link className="text-2xl text-white font-extralight" to="/serviceRequest">New service</Link><br></br>
        </div>
      );

    }else if(info.auth === false){
      return(<Logout/>);
    }

  }
};

export default SessionClient