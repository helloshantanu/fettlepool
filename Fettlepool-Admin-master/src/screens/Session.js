import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment  from 'moment'

export class Session extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            snackbar: false,
            snackbarMsg: ''
        }
    }
    
    async componentDidMount() {
            if (localStorage.getItem('admin') == null)
                this.props.history.push('/login');
        else{
        var token = 'Bearer ' + localStorage.getItem('token')
        console.log(this.props.location.state.uId)
        await axios({
            method: 'post',
            url: 'https://api.fettlepool.in/api/adminToken/getUserLog',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "access_analytics",
                uId:this.props.location.state.uId
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
                <Sidebar history={this.props.history} />

                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>
                    < div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
                        <div>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-history" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Sessions History</h1>
                            </div>
                        </div>

                    </div >
                    {
                        this.state.data.length > 0 ?
                            <div style={{ paddingLeft: '20px', paddingRight: '30px', paddingTop: '30px' }}>
                                <div class="equel-grid">
                                    <div class="grid">
                                        <div class="grid-body py-3">
                                            <p class="card-title ml-n1" style={{ fontSize: '24px' }}>Log Details</p>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover table-sm">
                                                <thead>
                                                    <tr class="solid-header">
                                                        <th style={{ background: 'white' }}>User Name</th>
                                                        <th style={{ background: 'white' }}>Email Id</th>
                                                        <th style={{ background: 'white' }}>Date</th>
                                                        <th style={{ background: 'white' }}>Time</th>
                                                    </tr>
                                                </thead>
                                                {this.state.data.map((detail, index) => (
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <small class="text-black font-weight-medium d-block">{detail.name}</small>
                                                            </td>
                                                            <td>
                                                                <small>{detail.email}</small>
                                                            </td>
                                                            <td> {moment.utc(detail.entryTime).toDate().toDateString()} </td>
                                                            <td> {moment.utc(detail.entryTime).toDate().toLocaleTimeString()} </td>
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

export default Session

    