import React from "react";
import { Link } from "react-router-dom";
import Logout from "../forms/logout";
const { useState, useEffect } = React;

const SessionProvider = () => {
  let [info, setInfo] = useState({
    name: "",
    company: "",
    services: [],
    auth: false,
    loaded: false,
  });

  const getProvider = async () => {
    let responseFromGet = await fetch("http://localhost:3000/providerHome", {
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
    getProvider();
  }, []);

  if (info.loaded === false) {
    return <div>Cargando...</div>;
  } else {
    if (info.auth === true) {
      return (
        <div>
          <h1 className="text-white text-xl">Welcome {info.name}</h1>
          <h2 className="text-white text-xl">Services</h2>
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
          <Link className="text-white text-xl" to="/logout">Logout</Link><br></br>
        </div>
      );

    }else if(info.auth === false){
      return(<Logout/>);
    }

  }
};

export default SessionProvider;