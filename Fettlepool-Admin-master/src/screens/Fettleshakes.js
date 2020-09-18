import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class Fettleshakes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            snackbar: false,
            snackbarMsg: '',
            openDialogP: false,
            openDialogI: false,
            newPrice:'',
            image: [],
            categoryId:'',
            itemId:''
        }
        this.handleClickOpenP = this.handleClickOpenP.bind(this);
        this.handleClickOpenI = this.handleClickOpenI.bind(this);
        this.handleCloseP = this.handleCloseP.bind(this);
        this.handleCloseI = this.handleCloseI.bind(this);
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

    openDialogImage(cId,iId){
        this.setState({
            categoryId:cId,
            itemId:iId
        })
        this.handleClickOpenI();
    }

    openDialogPrice(cId,iId){
        this.setState({
            categoryId:cId,
            itemId:iId
        })
        this.handleClickOpenP();
    }

    handleClickOpenI() {
        this.setState({
            openDialogI: true
        })
    };

    handleClickOpenP() {
        this.setState({
            openDialogP: true
        })
    };

    handleCloseI() {
        this.setState({
            openDialogI: false
        })
    };
    handleCloseP() {
        this.setState({
            openDialogP: false
        })
    };

    async deleteItems(categoryId,itemId){
        
        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'delete',
            url: 'https://api.fettlepool.in/api/adminToken/deleteItems',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "use_cafe",
                categoryId: categoryId,
                itemId: itemId
            }
        }).then(response => {
            if (response.status == 200) {
                this.setState({
                    snackbar: true,
                    snackbarMsg: 'Item Deleted Succesfully'
                });
                window.location.reload();
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    async addBestSeller(categoryId,itemId){
        
        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'patch',
            url: 'https://api.fettlepool.in/api/adminToken/addbestseller',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "use_cafe",
                categoryId: categoryId,
                itemId: itemId
            }
        }).then(response => {
            if (response.status == 200) {
                this.setState({
                    snackbar: true,
                    snackbarMsg: 'Item Edited Succesfully'
                });
                window.location.reload();
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    async editPrice(){
        
        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'patch',
            url: 'https://api.fettlepool.in/api/adminToken/editpriceshakes',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "use_cafe",
                categoryId: this.state.categoryId,
                itemId: this.state.itemId,
                newPrice: this.state.newPrice
            }
        }).then(response => {
            if (response.status == 200) {
                this.setState({
                    snackbar: true,
                    snackbarMsg: 'Item Edited Succesfully'
                });
                window.location.reload();
            }
            else{
                this.setState({
                    snackbar: true,
                    snackbarMsg: 'Try again Later'
                });  
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    async changeImage() {
        try {
            var data = new FormData();
            data.append('image', this.state.image[this.state.image.length-1])

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

                var path = res.data["image"]

                var response = await axios({
                    method: 'patch',
                    url: 'https://api.fettlepool.in/api/adminToken/changeimageshakes',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                    data: {
                        scope: "use_cafe",
                        categoryId: this.state.categoryId,
                        itemId: this.state.itemId,
                        image: path
                    },
                });

                if (response.status == 200) {
                    this.setState({
                        snackbar: true,
                        snackbarMsg: 'Item Edited successfully.',

                    });
                    window.location.reload();
                }
                else {
                    this.setState({
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
    
    async removeBestSeller(categoryId,itemId){
        
        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'patch',
            url: 'https://api.fettlepool.in/api/adminToken/removebestseller',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "use_cafe",
                categoryId: categoryId,
                itemId: itemId
            }
        }).then(response => {
            if (response.status == 200) {
                this.setState({
                    snackbar: true,
                    snackbarMsg: 'Item Edited Succesfully'
                });
                window.location.reload();
            }
        })
            .catch(error => {
                console.log(error);
            });
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

                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9', marginBottom: '20px' }}>
                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '20px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-coffee" style={{ fontSize: '30px', paddingRight: '6px', color: 'white' }}></i>Fettle Shakes</h1>
                            </div>
                            <div style={{ paddingTop: '10px', marginRight: '40px' }}>
                                <div className="row" style={{ justifyContent: 'start' }}>
                                    <Link to="/addmenu"> <Button variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Add Items</Button></Link>
                                    <Link to="/addcategory"> <Button variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Add Category</Button></Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    {
                        this.state.data.length > 0 ?

                    <div style={{ paddingLeft: '15px', paddingRight: '30px' }}>
                    {this.state.data.map((detail, index) => (
                    <div class="equel-grid">
                        <div class="grid">
                            <div class="grid-body py-3">
                                    <p class="card-title ml-n1" style={{ fontSize: '24px' }}>{detail.categoryName}</p>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover table-sm">
                                    <thead>
                                        <tr class="solid-header">
                                            <th style={{background:'white',fontSize:16,color:'grey'}}>Item Name</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Item Price</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Item Description</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Available</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Created At</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Item Image</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Delete</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Best Seller</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Edit Price</th>
                                            <th style={{ background: 'white' ,fontSize:16,color:'grey'}}>Change Image</th>
                                        </tr>
                                    </thead>
                                {this.state.data[index]['menu'].map((item, idx) => (
                                    <tbody>
                                        <tr>
                                            <td><h5 class="text-black font-weight-medium d-block">{item.itemName}</h5></td>
                                            <td><h6>{item.itemPrice}</h6></td>
                                            <td><h6>{item.itemDescription}</h6></td>
                                            <td><h6>{item.isAvailable?'Yes':'No'}</h6></td>
                                            <td><h6>{moment.utc(item.created_at).toDate().toDateString()} at {moment.utc(item.created_at).toDate().toLocaleTimeString()} </h6></td>
                                            <td><img
                                                onClick={() => { window.open("https://api.fettlepool.in/" + item.itemImage , '_blank')}}
                                                height="100rem"
                                                src={"https://api.fettlepool.in/" + item.itemImage}
                                                alt="new"/></td>
                                            <td><Button onClick={() => this.deleteItems(this.state.data[index]['_id'], item._id)} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Delete Item</Button></td>
                                            {item.isBestSeller
                                            ?<td><Button onClick={() => this.removeBestSeller(this.state.data[index]['_id'], item._id)} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Remove BestSeller</Button></td>
                                            :<td><Button onClick={() => this.addBestSeller(this.state.data[index]['_id'], item._id)} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Add BestSeller</Button></td>}
                                            <td><Button onClick={()=> this.openDialogPrice(this.state.data[index]['_id'],item._id)}  variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Edit Price</Button></td>
                                            <td><Button onClick={() => this.openDialogImage(this.state.data[index]['_id'], item._id)}  variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Change Image</Button></td>
                                        </tr>
                                    </tbody>
                                ))}
                                </table>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                :<div></div>
             }
                </div>
                <Dialog
                    open={this.state.openDialogP}
                    fullWidth={true}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseP}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle style={{ color: '#00bfb2', fontWeight: 'bolder', fontSize: '24px' }}>Edit Shake Price?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <TextField label="New Price" name="newPrice" variant="outlined" style={{ width: '90%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.newPrice} onChange={this.handleChange} />
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button onClick={()=> this.editPrice()} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                            Submit
                            </Button>
                        <Button onClick={this.handleCloseP} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                            Cancel
                            </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openDialogI}
                    fullWidth={true}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseI}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle style={{ color: '#00bfb2', fontWeight: 'bolder', fontSize: '24px' }}>Change Shake Image?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Select New image : 
                            <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" style={{ width: '45%',marginLeft:'5px' }} onChange={e => this.handleChangeImage(e)} />
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button onClick={() => this.changeImage()} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                            Submit
                            </Button>
                        <Button onClick={this.handleCloseI} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                            Cancel
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Fettleshakes
