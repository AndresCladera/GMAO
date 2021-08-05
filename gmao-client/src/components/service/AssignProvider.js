import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory} from "react-router-dom";
const { useState, useEffect } = React;

const AssignProvider = () => {
    console.log(useParams());
    let [info, setInfo] = useState({
        providers: [],
    });

    let history = useHistory();

    let guild = useParams().typeOfService;
    let idService = useParams().id
    console.log(guild);


    let postProvider = async () => {
        console.log(guild);
        let responseFromPost = await fetch(`http://localhost:3000/assignProvider/${guild}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: window.localStorage.token,
            },
            body: JSON.stringify({
                provider: info.provider,

            }),
        })
            .then((response) => response.json())
            .then((result) => {
                return (result)
            });
        console.log(responseFromPost.providers[0]);

        setInfo({
            providers: responseFromPost.providers
        })
    };
    const handleClick = async (idProvider, event) => {
        event.preventDefault();
        console.log(idProvider);
        console.log(idService);
        await updateProviderOnService(idProvider);
        history.push(`/service/${idService}`)
    }

    const updateProviderOnService = async (idProv) => {
        let responseFromUpdate = await fetch(`http://localhost:3000/addProvider/${idService}/${idProv}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: window.localStorage.token,
            },
            body: JSON.stringify({
                provider: info.provider,

            }),
        })
            .then((response) => response.json())
            .then((result) => {
                return (result)
            });
            console.log(responseFromUpdate);

    }

    useEffect(() => {
        postProvider();
    }, []);

    return (
        <div>{console.log(info.providers)}
            <h1 className="form-container p-8 text-xl text-white font-extralight">Assign Provider</h1>
            <tbody className="p-8 text-base text-black font-light">
                {info.providers.map((provider) => {
                    return (
                        <tr key={provider._id} className="service-container p-10">
                            <td >{provider.company}</td>
                            <td>{provider.guild}</td>
                            <td><button onClick={(event) =>{handleClick(provider._id, event)}}>Select Provider</button></td>
                        </tr>
                    )
                })}
            </tbody>
            <Link className="p-8 text-white text-xl" to="/session">Back to services</Link>
        </div>
    )
}
export default AssignProvider;