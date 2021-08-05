// import "../forms";
import { Link } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";
const useState = React.useState;


const Login = () => {
    let [info, setInfo] = useState({
        companyMail: "",
        password: "",
    });

    let history = useHistory();

    const handleChange = (event) => {
        event.preventDefault();
        setInfo({
            ...info,
            [event.target.name]: event.target.value,
        })
    };


    let postLogin = async () => {
        let responseLogin = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyMail: info.companyMail,
                password: info.password,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) =>{
                console.error(error);
            })
            console.log(responseLogin.rol);
            return responseLogin;
    };
    

    const saveToken = (obj) => {
        window.localStorage.setItem("token", obj.newToken)
        
    }

    const saveRol = (obj) => {
        window.localStorage.setItem("rol", obj.rol)
    }

    const redirect = () => {
        // if (.rol === "Client"){
        history.push("/session");
        // else if (.rol === "Provider"){
        //     history.push("/sessionProvider");
        // }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            let objResponse = await postLogin();
            console.log({objResponse});
            saveToken(objResponse);
            saveRol(objResponse);
            redirect();
              } catch (error) {
                  console.error(error);  
        }
        
    };

    return (
        <div className="form-container p-8 text-2xl text-white font-extralight">
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <label>User name:</label><br></br>
                <input type="text" name="companyMail" onChange={handleChange} /><br></br>
                <label>Password:</label><br></br>
                <input type="text" name="password" onChange={handleChange} /><br></br><br></br>
                <input className ="text-black" type="submit" value="Submit" /><br></br>
                <Link to="/">Back to Home</Link>
            </form>
        </div>
    );
};

export default Login;