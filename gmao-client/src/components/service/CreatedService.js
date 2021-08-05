import React from "react";
import { useParams } from "react-router-dom";
const { useState, useEffect } = React;

const CreatedService = () => {
    console.log(useParams())
    let [info, setInfo] = useState({
        id: "",
        date: "",
        client: "",
        direction: "",
        typeOfService: "",
        description: "",
    });

//     // const GetCreatedService = async () =>{
//     //     let responseFromGet = await fetch(`http://localhost:3000//${guild}`, {
//     //         method: "POST",
//     //         headers: {
//     //             Accept: "application/json",
//     //             "Content-Type": "application/json",
//     //             token: window.localStorage.token,
//     //         },
//     //         body: JSON.stringify({
//     //             provider: info.provider,

//     //         }),
//     //     })
//     //         .then((response) => response.json())
//     //         .then((result) => {
//     //             return (result)
//     //         });
// }





    return (
        <p1>Service Created and Assigned Succesfully</p1>
    )
    
}
export default CreatedService;