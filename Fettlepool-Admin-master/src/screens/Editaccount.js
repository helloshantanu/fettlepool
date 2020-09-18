import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';


export class Editaccount extends Component {
    async componentDidMount() {

        if (localStorage.getItem('admin') == null)
            this.props.history.push('/login');
    }
    render() {
        return (
            <div className="page-body">
                <Sidebar history={this.props.history} />


                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
                        <div>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-account" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>{this.props.location.state.name}</h1>
                            </div>
                        </div>

                    </div>

                    <div style={{ paddingLeft: '20px' }}>

                        <div class="row" style={{ justifyContent: 'space-evenly', paddingTop: '40px' }}>
                            <div class="col-md-3 col-sm-6 col-6 equel-grid">
                                <Link to={{ pathname: "/editprofilescreen", state: { uId: this.props.location.state.uId,screen: 'Email' } }}>
                                    <div class="grid cards-with-gradient">
                                        <div class="grid-body text-gray">
                                            <div class="row">
                                                <img src="assets/images/editemail.png" width="45px" height="45px"></img>
                                                <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Change Email</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div class="col-md-3 col-sm-6 col-6 equel-grid">
                                <Link to={{ pathname: "/editprofilescreen", state: { uId: this.props.location.state.uId, screen:'Mobile' } }}>
                                    <div class="grid cards-with-gradient">
                                        <div class="grid-body text-gray">
                                            <div class="row">
                                                <img src="assets/images/editmobile.png" width="45px" height="45px"></img>
                                                <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Change Mobile</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div class="col-md-3 col-sm-6 col-6 equel-grid">
                                <Link to={{ pathname: "/editprofilescreen", state: { uId: this.props.location.state.uId, screen: 'Address' } }}>
                                    <div class="grid cards-with-gradient">
                                        <div class="grid-body text-gray">
                                            <div class="row" >
                                                <img src="assets/images/editaddress.png" width="45px" height="45px"></img>
                                                <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Change Address</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Editaccount
