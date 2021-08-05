import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom;"
const { useState, useEffect } = React;



const ServiceRequest = () => {
    let [info, setInfo] = useState({
        date: "",
        company: "",
        direction: "",
        typeOfService: "",
        description: "",

    });

    let history = useHistory();

    const handleChange = (event) => {
        event.preventDefault();
        setInfo({
            ...info,
            [event.target.name]: event.target.value,
        })
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let id= await postService();
        redirect(id);
    }
    let postService = async () => {
        let responseFromPost = await fetch("http://localhost:3000/serviceRequest", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: window.localStorage.token,
            },
            body: JSON.stringify({
                date: info.date,
                client: info.company,
                direction: info.direction,
                typeOfService: info.typeOfService,
                description: info.description,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                return (result)
            });
            console.log(responseFromPost.service._id);
            return (responseFromPost.service._id);

    };

    const redirect= (serviceId)=>{
    history.push(`/assignProvider/${serviceId}/${info.typeOfService}`);
    }




    return (
        <div  className="form-container p-8 text-xl text-white font-extralight">
            <h1 className="text-2xl">Service Request</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Date:</label><br></br>
                <input type="text" name="date" onChange={handleChange} /><br></br>
                <label>Company:</label><br></br>
                <input type="text" name="company" onChange={handleChange} /><br></br>
                <label>Direction:</label><br></br>
                <input type="text" name="direction" onChange={handleChange} /><br></br>
                <label>type of Service:</label><br></br>
                <input type="text" name="typeOfService" onChange={handleChange} /><br></br>
                <label>Description:</label><br></br>
                <input type="text" name="description" onChange={handleChange} /><br></br><br></br>
                <input className="text-black" type="submit" value="Submit" /><br></br><br></br>
            </form>
            <Link className="text-white text-xl" to="/session">Back to your Session</Link>
        </div>
    )
}



export default ServiceRequest