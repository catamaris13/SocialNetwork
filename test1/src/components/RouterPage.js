import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from "./Login";
import Registration from "./Registration";
import UserHeader from "./UserHeader";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import RegistrationList from "./RegistrationList";
import News from "./News";
import Staff from "./Staff";
export default function RouterPage(){
    return (
        <Router>
            <Routes>
                <Route path="/" exact component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/userdashboard" component={UserDashboard}/>
                <Route path="/adminDashboard" component={AdminDashboard}/>
                <Route path="/registrationlist" component={RegistrationList}/>
                <Route path="/news" component={News}/>
                <Route path="/staff" component={Staff}/>
            </Routes>
        </Router>
    )
}