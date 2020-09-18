import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router , Route} from "react-router-dom";
import Login from './screens/Login';
import Dashbaord from './screens/Dashboard';
import Fettleshakes from './screens/Fettleshakes';
import Users from './screens/Users';
import Register from './screens/Register';
import Log from './screens/Log';
import Admin from './screens/Admin';
import Userprofile from './screens/Userprofile';
import AddMenu from './screens/AddMenu';
import Session from './screens/Session';
import Transactions from './screens/Transactions';
import Editaccount from './screens/Editaccount';
import Signup from './screens/Signup';
import Superuser from './screens/Superuser';
import VerifyAdmin from './screens/VerifyAdmin';
import AddGym from './screens/AddGym';
import Gyms from './screens/Gyms';
import AllTransactions from './screens/AllTransactions';
import AddCategory from './screens/AddCategory';
import AdminCard from './screens/AdminCard';
import AdminLog from './screens/AdminLog';
import EditProfileScreen from './screens/EditProfileScreen';

// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Router>
        <Route exact path="/" component={App}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/superuser" component={Superuser}></Route>
        <Route path="/dashboard" component={Dashbaord}></Route>
        <Route path="/fettleshakes" component={Fettleshakes}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/log" component={Log}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/userprofile" component={Userprofile}></Route>
        <Route path="/addmenu" component={AddMenu}></Route>
        <Route path="/session" component={Session}></Route>
        <Route path="/transactions" component={Transactions}></Route>
        <Route path="/editaccount" component={Editaccount}></Route>
        <Route path="/verifyadmin" component={VerifyAdmin}></Route>
        <Route path="/addgym" component={AddGym}></Route>
        <Route path="/gyms" component={Gyms}></Route>
        <Route path="/allTransactions" component={AllTransactions}></Route>
        <Route path="/addcategory" component={AddCategory}></Route>
        <Route path="/admincard" component={AdminCard}></Route>
        <Route path="/adminlog" component={AdminLog}></Route>
        <Route path="/editprofilescreen" component={EditProfileScreen}></Route>
    </Router>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
