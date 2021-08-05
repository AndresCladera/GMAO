import GetOut from "../../images/getOut.gif";
import {Link} from "react-router-dom";

const Logout = () =>{
    return (
        <div>
            <img src={GetOut} alt="Go Away"/>
            <Link to="/login">Back to home. Nice try tho</Link>
        </div>
    )
}
export default Logout;