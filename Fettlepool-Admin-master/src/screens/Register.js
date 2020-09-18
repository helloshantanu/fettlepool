import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Select, InputLabel, MenuItem,FormControl } from '@material-ui/core';



export class Register extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email:'',
            mobile:'',
            locality:'',
            city:'',
            state:'',
            cardNo:'',
            gymId:'',
            balance:0,
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

    async registerUser() {

    if ( this.state.email != '' && this.state.mobile != '' && this.state.locality != '' && this.state.city != '' && this.state.state != '' && this.state.cardNo != '') {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Registering User'
            });
            var res = await axios({
                method: 'patch',
                url: 'https://api.fettlepool.in/api/adminToken/registercard',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'x-fettlepool-device-auth':this.state.cardNo
                },
                data: {
                    "scope": "add_rfid",
                    "email": this.state.email,
                    "mobile": this.state.mobile,
                    "locality": this.state.locality,
                    "city": this.state.city,
                    "state": this.state.state,
                    "gymId": this.state.gymId,
                    "balance": this.state.balance,
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'User registered successfully.',
                    email: '',
                    mobile: '',
                    locality: '',
                    city: '',
                    state: '',
                    cardNo: '',
                    gymId: '',
                    balance: '',
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
        else {
        var token = 'Bearer ' + localStorage.getItem('token')
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
        });}
    }
    render() {
        return (
            <div className="page-body">

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbar}
                    message={<span style={{ textAlign: 'center' }}>{this.state.snackbarMsg}</span>}
                />

                <Sidebar history={this.props.history}/>

                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
                        <div>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-clipboard-text" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>User Registration</h1>
                            </div>
                        </div>

                    </div>

                    <div style={{ padding: '30px 30px 0px 20px' }}>
                        
                        <div className="equel-grid">
                            <div className="grid">
                                <div class="grid-body py-3">
                                    <p class="card-title ml-n1" style={{ fontSize: '26px',fontFamily:'poppins',fontWeight:'bold' }}>Registration Form</p>
                                </div>
                                <div style={{padding:'15px'}}>
                                    
                                <form>
                                {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                        <TextField label="First Name" variant="outlined"style={{width:'45%'}} inputProps={{style:{fontSize:19,fontFamily:'poppins',fontWeight:'bold'}}} InputLabelProps={{style:{fontSize:19,fontFamily:'poppins'}}} />
                                        <TextField label="Last Name" variant="outlined" style={{width:'45%'}} inputProps={{style:{fontSize:19,fontFamily:'poppins',fontWeight:'bold'}}} InputLabelProps={{style:{fontSize:19,fontFamily:'poppins'}}}/>
                                </div> */}

                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',paddingTop:'30px'}}>
                                            <TextField label="Email" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="email" value={this.state.email} onChange={this.handleChange}/>
                                            <TextField label="Mobile Number" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="mobile" value={this.state.mobile} onChange={this.handleChange}/>
                                </div>

                                {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start',paddingLeft:'2.5%', paddingTop: '30px' }}>
                                    <TextField label="Gender" select variant="outlined" style={{ width: '45%' }} value={gender} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} SelectProps={{ native: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} >
                                        {gender.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}</TextField>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start',paddingLeft:'2.5%', paddingTop: '30px' }}>
                                    <TextField label="Date of Birth" variant="outlined" type="date" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ shrink: true, style: { fontSize: 19, fontFamily: 'poppins' } }} defaultValue="2017-05-24" />
                                </div> */}

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Locality" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="locality" value={this.state.locality} onChange={this.handleChange}/>
                                </div>

                                {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%',paddingTop:'30px'}}>                                        
                                    <TextField label="Address" multiline rows="3" variant="outlined" style={{width:'45%'}} inputProps={{style:{fontSize:19,fontFamily:'poppins',fontWeight:'bold'}}} InputLabelProps={{style:{fontSize:19,fontFamily:'poppins'}}}/>
                                </div> */}

                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',paddingTop:'30px'}}>
                                            <TextField label="City" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="city" value={this.state.city} onChange={this.handleChange}/>
                                            <TextField label="State" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="state" value={this.state.state} onChange={this.handleChange}/>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Card Number" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="cardNo" value={this.state.cardNo} onChange={this.handleChange}/>
                                            
                                    
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Balance" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="balance" value={this.state.balance} onChange={this.handleChange}/>
                                            
                                    
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <FormControl variant="outlined" style={{ width: '45%' }}>
                                            <InputLabel  >Gym Name</InputLabel>
                                            <Select  placeholder="Gym Name" label="Gym Name"  name="gymId" value={this.state.gymId} onChange={this.handleChange}>
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
                                                    : <Button onClick={() => this.registerUser()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Register User</Button>
                                            }
                                        </div>

                                </form>
                                </div>
                            </div>

                        </div>
                        

                    </div>
                </div>
            </div>
        )
    }
}

export default Register
