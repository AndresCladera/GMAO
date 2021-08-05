import { Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/forms/login";
import SessionClient from "./components/client/sessionClient";
import Service from "./components/service/Service";
import ServiceRequest from "./components/service/ServiceRequest";
import Signup from "./components/forms/signup";
import AssignProvider from "./components/service/AssignProvider";
import SessionProvider from "./components/provider/sessionProvider";
import CreatedService from "./components/service/CreatedService";
import Session from "./components/session/session";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route
         exact
          path="/"
           render={() =>{
          return <Home></Home>;
        }}
        />
        <Route
         exact
         path="/login"
         render={() => {
          return <Login></Login>
        }}
        />
        {/* <Route
         exact
         path="/sessionClient"
         render={() => {
          return <SessionClient></SessionClient>
        }}
        /> */}
         <Route
         exact
         path="/service/:id"
         render={() => {
          return <Service></Service>
        }}
        />
      <Route
         exact
         path="/serviceRequest"
         render={() => {
          return <ServiceRequest></ServiceRequest>
        }}
        />
        <Route
         exact
         path="/logout"
         render={() => {
          window.localStorage.clear();
          return <Login></Login>
        }}
        />
        <Route
         exact
         path="/signup"
         render={() => {
          return <Signup></Signup>
        }}
        />
         <Route
         exact
         path="/assignProvider/:id/:typeOfService"
         render={() => {
          return <AssignProvider></AssignProvider>
        }}
        />
        {/* <Route
         exact
         path="/sessionProvider"
         render={() => {
          return <SessionProvider></SessionProvider>
        }}
        /> */}
        <Route
         exact
         path="/createdService"
         render={() => {
          return <CreatedService></CreatedService>
        }}
        />
        <Route
         exact
         path="/session"
         render={() => {
          return <Session></Session>
        }}
        />
      </Switch>
    </div>
  );
}

export default App;
