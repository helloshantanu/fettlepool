import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'

export class Transactions extends Component {

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
            await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/adminToken/getUserTransactions',
                headers: {
                    'Authorization': token
                },
                data: {
                    scope: "access_analytics",
                    uId: this.props.location.state.uId
                }
            }).then(response => {
                if (response.status == 200) {
                    console.log(response.data)
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
                    < div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
                        <div>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-wallet" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Transactions History</h1>
                            </div>
                        </div>

                    </div >
                    {
                        this.state.data.length > 0 ?
                            <div style={{ paddingLeft: '20px', paddingRight: '30px', paddingTop: '30px' }}>
                                <div class="equel-grid">
                                    <div class="grid">
                                        <div class="grid-body py-3">
                                            <p class="card-title ml-n1" style={{ fontSize: '24px' }}>Transaction Details</p>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover table-sm">
                                                <thead>
                                                    <tr class="solid-header">
                                                        <th style={{ background: 'white' }}>Payment Id</th>
                                                        <th style={{ background: 'white' }}>Amount</th>
                                                        <th style={{ background: 'white' }}>Status</th>
                                                        <th style={{ background: 'white' }}>Method</th>
                                                        <th style={{ background: 'white' }}>Bank</th>
                                                        <th style={{ background: 'white' }}>Date</th>
                                                        <th style={{ background: 'white' }}>Time</th>
                                                    </tr>
                                                </thead>
                                                {this.state.data.map((detail, index) => (
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <small class="text-black font-weight-medium d-block">{detail.paymentId}</small>
                                                            </td>
                                                            <td>
                                                                <small class="text-black font-weight-medium d-block">{detail.amount}</small>
                                                            </td>
                                                            <td>{detail.status}</td>
                                                            <td>{detail.method}</td>
                                                            <td>{detail.bank}</td>
                                                            <td> {moment.utc(detail.created_at).toDate().toDateString()} </td>
                                                            <td> {moment.utc(detail.created_at).toDate().toLocaleTimeString()} </td>
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

export default Transactions
    