import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';


export class VerifyAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
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


    async componentDidMount() {

    if ( localStorage.getItem('admin') == null){
        this.props.history.push('/login');
    }

        else{
        await axios.get('https://api.fettlepool.in/api/admin/unverifiedadmin/' + localStorage.getItem("admin"))
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        data: response.data
                    })
                }
            })
            .catch(error => {
                // console.log(error);
            });
        }
        
       
    }

    async verifyAdmin(email){
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Verifying Admin'
            });
            var res = await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/admin/verifyAdmin',
                data: {
                    token: localStorage.getItem("token"),
                    adminEmail: email
                },
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Admin Verified Successfully'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                    this.props.history.push('/dashboard');
                }, 1000);
            }
            if (res.status == 401){
                localStorage.setItem("admin", "");
                localStorage.setItem("token", "");
                this.props.history.push('/login');
            }
            if(res.status == 400){
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Try Again Later.'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 2000);
            }
        }
        catch (err) {
            console.log(err)
            this.setState({
                snackbar: false,
                loading: false

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
                <Sidebar history={this.props.history}/>

                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>

                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9', marginBottom: '20px' }}>
                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-account-badge" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Verify Admin</h1>
                            </div>
                        </div>

                    </div>
                    
                    {
                        this.state.data.length>0 ?
                            <div style={{ paddingLeft: '15px', paddingRight: '30px' }}>

                                <div class="equel-grid">
                                    <div class="grid">
                                        <div class="grid-body py-3">
                                            <p class="card-title ml-n1" style={{ fontSize: '24px' }}>Admin Details</p>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover table-sm">
                                                <thead>
                                                    <tr class="solid-header">
                                                        <th style={{ background: 'white' }}>Name</th>
                                                        <th style={{ background: 'white' }}>Email Id</th>
                                                        <th style={{ background: 'white' }}>Mobile</th>
                                                        <th style={{ background: 'white' }}>Verify</th>
                                                    </tr>
                                                </thead>
                                                {this.state.data.map((detail, index) => (
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <small class="text-black font-weight-medium d-block">{detail.name}</small>
                                                            </td>
                                                            <td>{detail.email}</td>
                                                            <td>{detail.mobile}</td>
                                                            <td>
                                                                {
                                                                    this.state.loading == true ?
                                                                        <Button  variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                                        : <Button onClick={() =>this.verifyAdmin(detail.email)} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold' }}>Verify</Button>                                                                        
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : <div></div>
                    }
                    
                </div>
            </div>
        )
    }
}

export default VerifyAdmin
