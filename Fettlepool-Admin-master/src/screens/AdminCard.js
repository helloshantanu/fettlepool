import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {  FormControl } from '@material-ui/core';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class AdminCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            card:'',
            cardNo: '',
            gymId: '',
            loading: false,
            snackbar: false,
            snackbarMsg: '',
            openDialog: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClickOpen() {
        this.setState({
            openDialog: true
        })
    }

    handleClose() {
        this.setState({
            openDialog: false
        })
    }

    async registerUser() {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Registering Admin Card'
            });
            console.log(this.state.gymId)
            var res = await axios({
                method: 'patch',
                url: 'https://api.fettlepool.in/api/adminToken/registerAdminCard',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'x-fettlepool-device-auth': this.state.cardNo
                },
                data: {
                    "scope": "add_rfid",
                    "gymId": this.state.gymId,
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Admin Card registered successfully.',
                    email: '',
                    mobile: '',
                    locality: '',
                    city: '',
                    state: '',
                    cardNo: '',
                    gymId: ''
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 1500);
                window.location.reload();
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

    async blockCard() {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Blocking Card',
                openDialog: false

            });
            var res = await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/adminToken/blockCard',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    "scope": "access_secure_users_data",
                    "userID": ''
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Card blocked successfully.'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 1500);
                window.location.reload();
            }
            if (res.status == 500) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: res.data['message']
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 1500);
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

    async componentDidMount() {

        if (localStorage.getItem('admin') == null)
                this.props.history.push('/login');
        
        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'post',
            url: 'https://api.fettlepool.in/api/adminToken/getAdminCardDetails',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "access_gym"
            }
        }).then(response => {
            if (response.status == 200) {
                this.setState({
                    card: response.data['cardNo']
                })
            }
        })
            .catch(error => {
                console.log(error);
            });
        
        if(this.state.card==''){
            await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/gym/gyms',
                headers: {
                    'Authorization': token
                },
                data: {
                    scope: "access_gym"
                }
            }).then(response => {
                if (response.status == 200) {
                    this.setState({
                        data: response.data
                    })
                }
            })
                .catch(error => {
                    console.log(error);
                });
        }
        
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
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9', marginBottom: '20px' }}>
                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '20px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-account-card-details" style={{ fontSize: '30px', paddingRight: '6px', color: 'white' }}></i>Register Admin Card</h1>
                            </div>
                            <div style={{ paddingTop: '10px', marginRight: '40px' }}>
                                <div className="row" style={{ justifyContent: 'start' }}>
                                    <Link> <Button variant="contained" onClick={this.handleClickOpen} color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Block Admin Card</Button></Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Dialog
                        open={this.state.openDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle style={{ color: '#00bfb2', fontWeight: 'bolder', fontSize: '24px' }}>Block Admin Card?</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Block Fettle Pool Admin Card. By clicking on Block Card you will be blocking your admin card for any further use.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ justifyContent: 'center' }}>
                            <Button onClick={() => this.blockCard()} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                                Block Admin Card
                            </Button>
                            <Button onClick={this.handleClose} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{ padding: '30px 30px 0px 20px' }}>

                        <div className="equel-grid">
                            <div className="grid">

                                <div style={{ padding: '15px' }}>
                                    {
                                    this.state.card != '' ?
                                    <form>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Card Number" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="cardNo" value={this.state.card}  />
                                        </div>
                                    </form>

                                    :<form>

                                        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                            <TextField label="Card Number" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="categoryName" value={this.state.categoryName} onChange={this.handleChange} />
                                        </div> */}

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Card Number" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="cardNo" value={this.state.cardNo} onChange={this.handleChange} />
                                            
                                                    <FormControl variant="outlined" style={{ width: '45%' }}>
                                                        <InputLabel  >Gym Name</InputLabel>
                                                        <Select placeholder="Gym Name" label="Gym Name" name="gymId" value={this.state.gymId} onChange={this.handleChange}>
                                                            {this.state.data.map(option => (
                                                                <MenuItem value={option._id}>
                                                                    {option.name}
                                                                </MenuItem>

                                                            ))}</Select>
                                                    </FormControl>
                                        </div>




                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading == true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                    : <Button onClick={() => this.registerUser()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Register Admin Card</Button>
                                            }
                                        </div>

                                    </form>
                                    }
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default AdminCard
