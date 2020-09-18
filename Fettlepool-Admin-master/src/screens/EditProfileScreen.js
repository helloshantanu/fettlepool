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
import CircularProgress from '@material-ui/core/CircularProgress';




export default class EditProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            oldEmail: "",
            newEmail: "",
            oldMobile: "",
            newMobile: "",
            locality: "",
            city: "",
            state: "",
            loading: false,
            snackbar: false,
            snackbarMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async changeEmail() {
        if (this.state.newEmail != '' && this.state.oldEmail != '' ) {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Changing Email'
            });
            var res = await axios({
                method: 'patch',
                url: 'https://api.fettlepool.in/api/adminToken/changeEmail',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    "scope": "user_profile",
                    "userId": this.props.location.state.uId,
                    "oldEmail": this.state.oldEmail,
                    "newEmail": this.state.newEmail,
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Email changed Successfully.'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 1500);
                this.props.history.push('/users');
            }
        }
        catch (err) {
            console.log(err)
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'Try again later..'
            })
            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 2000);
        }
    }
    else {
        this.setState({
            snackbar: true,
            snackbarMsg: 'All fields are mandatory.'
        });
        setTimeout(() => {
            this.setState({
                snackbar: false
            });
        }, 1500);
    }
    }


    async changeMobile() {
        if (this.state.newMobile != '' && this.state.oldMobile != '' ) {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Changing Mobile'
            });
            var res = await axios({
                method: 'patch',
                url: 'https://api.fettlepool.in/api/adminToken/changeMobile',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    "scope": "user_profile",
                    "userId": this.props.location.state.uId,
                    "oldMobile": this.state.oldMobile,
                    "newMobile": this.state.newMobile,
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Mobile changed Successfully.'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 1500);
                this.props.history.push('/users');
            }
        }
        catch (err) {
            console.log(err)
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'Try again later..'
            })
            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 2000);
        }
    }
    else {
        this.setState({
            snackbar: true,
            snackbarMsg: 'All fields are mandatory.'
        });
        setTimeout(() => {
            this.setState({
                snackbar: false
            });
        }, 1500);
    }
    }


    async changeAddress() {
        if (this.state.locality != '' && this.state.city != '' && this.state.state !='' ) {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Changing Address'
            });
            var res = await axios({
                method: 'patch',
                url: 'https://api.fettlepool.in/api/adminToken/changeAddress',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    "scope": "user_profile",
                    "userId": this.props.location.state.uId,
                    "locality": this.state.locality,
                    "city": this.state.city,
                    "state": this.state.state
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Address changed Successfully.'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 1500);
                this.props.history.push('/users');
            }
        }
        catch (err) {
            console.log(err)
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'Try again later..'
            })
            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 2000);
        }
    }
    else {
        this.setState({
            snackbar: true,
            snackbarMsg: 'All fields are mandatory.'
        });
        setTimeout(() => {
            this.setState({
                snackbar: false
            });
        }, 1500);
    }
    }

    async componentDidMount() {

        if (localStorage.getItem('admin') == null)
            this.props.history.push('/login');
    }

    render() {
        return (
            <div className="page-body">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbar}
                    message={<span style={{ textAlign: 'center' }}>{this.state.snackbarMsg}</span>}
                />
                <Sidebar history={this.props.history} />


                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
                        <div>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-clipboard-alert" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Change {this.props.location.state.screen}</h1>
                            </div>
                        </div>

                    </div>

                    {   
                        this.props.location.state.screen=='Email'?
                        <div style={{ padding: '30px 30px 0px 20px' }}>

                            <div className="equel-grid">
                                <div className="grid">
                                    <div class="grid-body py-3">
                                        <p class="card-title ml-n1" style={{ fontSize: '26px', fontFamily: 'poppins', fontWeight: 'bold' }}>Change Email Form</p>
                                    </div>
                                    <div style={{ padding: '15px' }}>

                                        <form>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                                <TextField label="Old Email" name="oldEmail" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.oldEmail} onChange={this.handleChange} />                                            
                                                <TextField label="New Email" name="newEmail" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.newEmail} onChange={this.handleChange} />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading == true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                    : <Button onClick={() => this.changeEmail()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Change Email</Button>
                                            }
                                        </div>

                                        </form>
                                    </div>
                                </div>

                            </div>


                        </div>

                        : this.props.location.state.screen == 'Mobile'?
                                <div style={{ padding: '30px 30px 0px 20px' }}>

                                    <div className="equel-grid">
                                        <div className="grid">
                                            <div class="grid-body py-3">
                                                <p class="card-title ml-n1" style={{ fontSize: '26px', fontFamily: 'poppins', fontWeight: 'bold' }}>Change Mobile Form</p>
                                            </div>
                                            <div style={{ padding: '15px' }}>

                                                <form>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                                        <TextField label="Old Mobile Number" name="oldMobile" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.oldMobile} onChange={this.handleChange} />
                                                    
                                                        <TextField label="New Mobile Number" name="newMobile" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.newMobile} onChange={this.handleChange} />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading == true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                    : <Button onClick={() => this.changeMobile()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Change Mobile</Button>
                                            }
                                        </div>

                                                </form>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                                :
                                <div style={{ padding: '30px 30px 0px 20px' }}>

                                    <div className="equel-grid">
                                        <div className="grid">
                                            <div class="grid-body py-3">
                                                <p class="card-title ml-n1" style={{ fontSize: '26px', fontFamily: 'poppins', fontWeight: 'bold' }}>Change Address Form</p>
                                            </div>
                                            <div style={{ padding: '15px' }}>

                                                <form>

                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                                        <TextField label="Locality" name="locality" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.locality} onChange={this.handleChange} />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                                        <TextField label="City" name="city" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.city} onChange={this.handleChange} />
                                                        <TextField label="State" name="state" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.state} onChange={this.handleChange} />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading == true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                    : <Button onClick={() => this.changeAddress()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Change Address</Button>
                                            }
                                        </div>

                                                </form>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                    }

                </div>
            </div>
        )
    }
}
