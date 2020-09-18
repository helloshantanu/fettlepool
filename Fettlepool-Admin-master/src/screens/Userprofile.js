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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class Userprofile extends Component {

    
    constructor(props) {
        super(props);
        this.state={
            openDialog:false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

     handleClickOpen () {
        this.setState({
            openDialog:true
        })
    };

     handleClose () {
        this.setState({
            openDialog:false
        })
    };

    async componentDidMount() {

        if (localStorage.getItem('admin') == null)
            this.props.history.push('/login');
    }

    async blockCard(uid){
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
                    "userID": uid
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

    render() {
        return (
            <div className="page-body">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbar}
                    message={<span style={{ textAlign: 'center' }}>{this.state.snackbarMsg}</span>}
                />
                <Sidebar history={this.props.history} />


                <div className="page-content-wrapper" style={{ marginTop: '0px',padding:'0px'}}>
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor:'#f2f4f9'}}>
                            <div>
                            <div className="row" style={{  justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-account" style={{ fontSize: '36px', paddingRight: '6px',color:'white' }}></i>User Profile</h1>
                            </div>
                            </div>
                        
                    </div>

                    <div style={{paddingLeft:'20px'}}>
                        
                        {   
                                
                            this.props.location.state.city!= null ?
                                

                                <div class="row" style={{ justifyContent: 'space-evenly', paddingTop: '40px' }}>
                                    <div class="col-md-3 col-sm-6 col-6 equel-grid">
                                        <Link to={{ pathname: "/editaccount", state: { uId: this.props.location.state.uId, name: this.props.location.state.name }}}>
                                            <div class="grid cards-with-gradient">
                                                <div class="grid-body text-gray">
                                                    <div class="row">
                                                        <img src="assets/images/account.png" width="45px" height="45px"></img>
                                                        <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Edit Account</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-6 equel-grid">
                                        <Link to={{ pathname: "/session", state: { uId: this.props.location.state.uId } }}>
                                            <div class="grid cards-with-gradient">
                                                <div class="grid-body text-gray">
                                                    <div class="row">
                                                        <img src="assets/images/dumbbell.png" width="45px" height="45px"></img>
                                                        <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Sessions Log</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-6 equel-grid">
                                        <Link to={{ pathname: "/transactions", state: { uId: this.props.location.state.uId } }}>
                                            <div class="grid cards-with-gradient">
                                                <div class="grid-body text-gray">
                                                    <div class="row" >
                                                        <img src="assets/images/transaction.png" width="45px" height="45px"></img>
                                                        <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Transactions</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-6 equel-grid" onClick={this.handleClickOpen} >
                                        
                                        <div class="grid cards-with-gradient" >
                                            <div class="grid-body text-gray">
                                                <div class="row">
                                                    <img src="assets/images/pay.png" width="45px" height="45px"></img>
                                                    <h4 style={{ color: 'white', paddingTop: '8px', paddingLeft: '10px', fontFamily: 'poppins', fontWeight: 'bold' }}>Card Lost</h4>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                : <div></div>
                        }
                        

                        <Dialog
                            open={this.state.openDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description">
                            <DialogTitle  style={{ color: '#00bfb2',fontWeight: 'bolder',fontSize:'24px'}}>Card Lost?</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Block Fettle Pool Card. By clicking on Block Card you will be blocking the card for any further use.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions style={{justifyContent:'center'}}>
                                <Button onClick={() => this.blockCard(this.props.location.state.uId)} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                                    Block Card
                            </Button>
                                <Button onClick={this.handleClose} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                                    Cancel
                            </Button>
                            </DialogActions>
                        </Dialog>
                        

                        <div className="equel-grid" style={{paddingRight:'40px',paddingTop:'40px',paddingBottom:'20px'}}>
                            <div className="grid">
                                <div class="grid-body py-3">
                                    <p class="card-title ml-n1" style={{ fontSize: '26px', fontFamily: 'poppins', fontWeight: 'bold' }}>Account Details</p>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: '2.5%', }}>
                                    <TextField label="Name" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly:true,style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.name} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                        <TextField label="Email" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.email}/>
                                        <TextField label="Mobile Number" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.mobile} />
                                    </div>

                                    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px'}}>
                                    <TextField label="Card Number" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value="895632164613313" />
                                    <TextField label="Gym Name" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value="Virat Gym-Fettle Pool" />
                                    </div> */}
                                    
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                        <TextField label="Gender" variant="filled" style={{ width: '45%' }} value={this.props.location.state.gender} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} inputProps={{ readOnly: true,native: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }}/>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                        <TextField label="Date of Birth" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ shrink: true, style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.dob} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                        <TextField label="Locality" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.locality}/>
                                    </div>

                                    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                    <TextField label="Address" multiline rows="3" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value="Dodaballapur Road, Avalahalli, Bengaluru-560064" />
                                    </div> */}

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px', paddingBottom: '30px' }}>
                                        <TextField label="City" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.city}/>
                                        <TextField label="State" variant="filled" style={{ width: '45%' }} inputProps={{ readOnly: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.props.location.state.state}/>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Userprofile
