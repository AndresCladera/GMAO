import { Link } from "react-router-dom";
import "./home.css";
import { Hola } from "./hola";

const Home = () => {
    return (
        <div className="home-container  p-8">
            <div>
                <h1 className="text-4xl text-white">iScale F.M.</h1>
            </div>
            <div className="px-4 cursor-pointer md:hidden">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </div>

            <div className="pr-8 md:block hidden">
                <h2 className="text-2xl text-white font-extralight">Login As</h2>
                <Link to="/login" className="text-white">Client</Link><br></br>
                <Link to="/login" className="text-white">Provider</Link><br></br>
                <Link to="/signup" className="text-white">SignUp</Link>
            </div>
            {/* <div>
                <h1>About us..</h1>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

            </div> */}
            <div>
                {/* hola mundo
                <Hola name="Andrés" lastname="Cladera"></Hola> */}
            </div>
        </div>
    );
};

export default Home;