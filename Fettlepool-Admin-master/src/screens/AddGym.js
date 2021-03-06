import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

export class AddGym extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            gymNo: "",
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

    async componentDidMount() {

        if (localStorage.getItem('admin') == null)
            this.props.history.push('/login');
    }

    async registerGym (){
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Registering Gym'
            });
            var res = await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/gym/create',
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                },
                data:{
                    "scope": "add_gym",
                    "name": this.state.name,
                    "locality": this.state.locality,
                    "city": this.state.city,
                    "state": this.state.state,
                    "gymNo": this.state.gymNo,
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Gym regstered successfully.',
                    name: "",
                    gymNo: "",
                    locality: "",
                    city: "",
                    state: "",
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

                <Sidebar history={this.props.history}/>
                
                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
                        <div>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-store" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Gym Registration</h1>
                            </div>
                        </div>

                    </div>

                    <div style={{ padding: '30px 30px 0px 20px' }}>

                        <div className="equel-grid">
                            <div className="grid">
                                <div class="grid-body py-3">
                                    <p class="card-title ml-n1" style={{ fontSize: '26px', fontFamily: 'poppins', fontWeight: 'bold' }}>Registration Form</p>
                                </div>
                                <div style={{ padding: '15px' }}>

                                    <form>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',paddingLeft: '2.5%', }}>
                                            <TextField label="Gym Name" name="name" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.name} onChange={this.handleChange}/>
                                        </div>



                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Mobile Number" name="gymNo" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.gymNo} onChange={this.handleChange}/>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            <TextField label="Locality" name="locality" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.locality} onChange={this.handleChange}/>
                                        </div>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                            <TextField label="City" name="city" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.city} onChange={this.handleChange}/>
                                            <TextField label="State" name="state" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.state} onChange={this.handleChange}/>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading==true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                :<Button onClick={() => this.registerGym()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Register Gym</Button>
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

export default AddGym
