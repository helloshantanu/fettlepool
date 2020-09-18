import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';



export class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query:'',
            data:[],
            responseData:[],
            loading: false,
            snackbar: false,
            snackbarMsg: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    filterArray = () => {
        let searchString = this.state.query;
        let searchData = this.state.data;



        if (searchString.length > 0) {
            console.log(searchString);
            this.state.responseData = searchData.filter(function(s){
                return s.email == searchString;
            });
        }

    }
    

    async componentDidMount() {
            if (localStorage.getItem('admin') == null)
                this.props.history.push('/login');
        
        await this.loadUserData();
    }

    async loadUserData(){
        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'post',
            url: 'https://api.fettlepool.in/api/adminToken/allUsers',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "access_secure_users_data"
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
        this.setState({
            responseData: this.state.data
        })
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

                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px'}}>
                    
                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' ,marginBottom:'20px'}}>
                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins' ,fontWeight:'bolder'}}>
                                    <i class="mdi mdi-account" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Users</h1>
                            </div>
                            <div className="row">
                                <div style={{ paddingTop: '10px', marginRight: '5px' }}>
                                <form  className="t-header-search-box">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" autoComplete="off" style={{ backgroundColor: 'white', color: 'black', marginRight: '10px' }} onChange={(e) => this.handleChange(e)} />
                                        <Button variant="contained" color="primary" style={{ backgroundColor: 'white', fontWeight: 'bold', color:'#00bfb2' }}><i className="mdi mdi-arrow-right-thick" onClick={this.filterArray()}></i>Search</Button>
                                    </div>
                                </form>
                            </div>
                                <div style={{ paddingTop: '10px' ,marginRight: '40px'}}>
                                    <Button variant="contained" color="primary" style={{ backgroundColor: 'white', fontWeight: 'bold', color: '#00bfb2', marginLeft: '4px' }}><i className="mdi mdi-reload" onClick={() => window.location.reload()}></i>Reset</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                    {
                        this.state.data.length > 0 ?
                    <div style={{paddingLeft:'15px',paddingRight:'30px'}}>

                    <div class="equel-grid">
                        <div class="grid">
                            <div class="grid-body py-3">
                                <p class="card-title ml-n1" style={{ fontSize: '24px' }}>User Details</p>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover table-sm">
                                    <thead>
                                        <tr class="solid-header">
                                            <th style={{ background: 'white' }}>Name</th>
                                            <th style={{ background: 'white' }}>Email Id</th>
                                            <th style={{ background: 'white' }}>Mobile</th>
                                            <th style={{ background: 'white' }}>Registered</th>
                                            <th style={{ background: 'white' }}>View Profile</th>
                                        </tr>
                                    </thead>
                                    {this.state.responseData.map((details, idx) => (
                                    <tbody>
                                        <tr>
                                            <td>
                                                <small class="text-black font-weight-medium d-block">{details.firstName}</small>
                                            </td>
                                                <td>{details.email}</td>
                                                <td>{details.mobile}</td>
                                                {details.city ? <td>Yes</td> : <td>No</td> }
                                                <td><Link to={{ pathname: '/userprofile', state: { uId: details._id, name: details.firstName, email: details.email, mobile: details.mobile, gender: details.gender, dob: details.dob, locality: details.locality, city: details.city, state: details.state}}}><Button variant="contained" color="primary" style={{ backgroundImage:'linear-gradient(315deg, #00bfb2 0%, #028090 74%)',fontWeight:'bold'}}>View</Button></Link></td>
                                        </tr>
                                    </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                :<div></div>
                }
                </div>
            </div>
        )
    }
}

export default Users
