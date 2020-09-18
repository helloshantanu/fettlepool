import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';

export class AddMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemName: '',
            itemPrice: '',
            itemDescription: '',
            categoryId: '',
            image:[],
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

    handleChangeImage(event) {
        this.state.image.push(event.target.files[0])        
    }

    async registerItem() {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Registering Item'
            });

            var data = new FormData();
            data.append('image', this.state.image[0])

            var res = await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/images/uploadCafeImage',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'scope': 'add_cafe_items',
                    'content-type': `multipart/form-data`
                },
                data: data,
            });

            if (res.status == 200) {

                var path=res.data["image"]
                
                var response = await axios({
                    method: 'post',
                    url: 'https://api.fettlepool.in/api/adminToken/addMenuItems',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                    data: {
                        "categoryId": this.state.categoryId,
                        "itemName": this.state.itemName,
                        "itemImage": path,
                        "itemPrice": this.state.itemPrice,
                        "itemDescription": this.state.itemDescription,
                        "scope": "user_profile"
                    },
                });

                if(response.status==200){
                    this.setState({
                        loading: false,
                        snackbar: true,
                        snackbarMsg: 'Item added successfully.',
                        itemName: '',
                        itemPrice: '',
                        itemDescription: '',
                        categoryId: '',
                        
                    });
                    window.location.reload();
                }
                else
                {
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
            url: 'https://api.fettlepool.in/api/adminToken/getAllCategories',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "use_cafe"
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
                                            <TextField label="Item Name" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="itemName" value={this.state.itemName} onChange={this.handleChange} />
                                            <TextField label="Item Price" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="itemPrice" value={this.state.itemPrice} onChange={this.handleChange} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '30px' }}>
                                            <TextField label="Item Description" variant="outlined" style={{ width: '45%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} name="itemDescription" value={this.state.itemDescription} onChange={this.handleChange} />
                                            <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" style={{ width: '45%' }} onChange={e => this.handleChangeImage(e)}/>
                                        </div>



                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingLeft: '2.5%', paddingTop: '30px' }}>
                                            {/* <TextField select variant="outlined" style={{ width: '45%' }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} SelectProps={{ native: true, style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} name="categoryId" value={this.state.categoryId} onChange={this.handleChange}>
                                                {this.state.data.map(option => (
                                                    <option value={option._id}>
                                                        {option.categoryName}
                                                    </option>

                                                ))}</TextField> */}
                                            <FormControl variant="outlined" style={{ width: '45%' }}>
                                            <InputLabel >Categories</InputLabel>
                                            <Select placeholder="Item Categories"  label="Item Categories" style={{ width: '45%' }} name="categoryId" value={this.state.categoryId} onChange={this.handleChange}>
                                                {this.state.data.map(option => (
                                                    <MenuItem value={option._id}>
                                                        {option.categoryName}
                                                    </MenuItem>

                                                ))}
                                                </Select>
                                            </FormControl>
                                        </div>


                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '50px' }}>
                                            {
                                                this.state.loading == true ?
                                                    <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                    : <Button onClick={() => this.registerItem()} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px' }}>Add Item</Button>
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

export default AddMenu
