import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const useState = React.useState;

const Signup = () => {
    let [info, setInfo] = useState({
        name: "",
        lastname: "",
        company: "",
        phone: "",
        email: "",
        password: "",
        rol:""
    });

    let history = useHistory();

    const handleChange = (event) => {
        event.preventDefault();
        setInfo({
            ...info,
            [event.target.name]: event.target.value,
        })
    };

    let postSignup = async () => {
        let responseSignup = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: info.name,
                lastname: info.lastname,
                company: info.company,
                phone: info.phone,
                companyMail: info.email,
                password: info.password,
                rol : info.rol
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                return result;
            });
            console.log(responseSignup);
        return responseSignup;
    };

    const saveToken = (obj) => {
        console.log(obj);
        window.localStorage.setItem("token", obj.newToken);

    };
    const saveRol = (obj) => {
        window.localStorage.setItem("rol", obj.rol)
    }

    const redirect = () => {
        history.push("/session");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let objResponse = await postSignup();
        saveRol(objResponse);
        saveToken(objResponse);
        redirect();
    };



    return (
        <div className="form-container p-8 text-xl text-white font-extralight">
            <p className="text-2xl">SIGN UP</p>
            <form onSubmit={handleFormSubmit}>
                <label>User name:</label><br></br>
                <input type="text" name="name" onChange={handleChange} /><br></br>
                <label>Lastname:</label><br></br>
                <input type="text" name="lastname" onChange={handleChange} /><br></br>
                <label>Company:</label><br></br>
                <input type="text" name="company" onChange={handleChange} /><br></br>
                <label>Email:</label><br></br>
                <input type="text" name="email" onChange={handleChange} /><br></br>
                <label>Phone:</label><br></br>
                <input type="text" name="phone" onChange={handleChange} /><br></br>
                <label>Password:</label><br></br>
                <input type="text" name="password" onChange={handleChange} /><br></br>
                <label>Rol:</label><br></br>
                <input type="text" name="rol" onChange={handleChange} /><br></br><br></br>
                <input className ="text-black" type="submit" value="Signup" /><br></br>
                
            </form><br></br>
            <Link className="text-2xl" to="/">Back to Home</Link><br></br>
        </div>
    )
}
export default Signup;