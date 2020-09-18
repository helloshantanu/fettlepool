import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Select, InputLabel, MenuItem } from '@material-ui/core';

export class AddCategory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
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


    async registerItem() {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Registering Category'
            });



            var response = await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/adminToken/createCategory',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                data: {
                    "data": {
                        "categoryName": this.state.categoryName
                    },
                    "scope": "user_profile"
                },
            });

            if (response.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Category added successfully.',
                    categoryName: ''

                });
                window.location.reload();
            }
            else {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Try Again Later.'
                });
            }

            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 1500);
            
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
                                    <i class="mdi mdi-clipboard-text" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Add Items</h1>
                            </div>
                        </div>

                    </div>

                    <div style={{ padding: '30px 30px 0px 20px' }}>

                        <div className="equel-grid">
                            <div className="grid">

                                <div style={{ padding: '15px' }}>

                                    <form>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                            <TextField label="Category Name" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="categoryName" value={this.state.categoryName} onChange={this.handleChange} />
                                        </div>






                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading == true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                    : <Button onClick={() => this.registerItem()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Add Category</Button>
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

export default AddCategory
