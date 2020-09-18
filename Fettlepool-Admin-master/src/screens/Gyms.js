import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export class Gyms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            snackbar: false,
            snackbarMsg: '',
            openDialog: false,
            contact: '',
            gymId:''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    openDialogBox(gym){
        this.setState({ gymId: gym }); 
        this.handleClickOpen();
    }

    handleClickOpen() {
        this.setState({
            openDialog: true
        })
    };

    handleClose() {
        this.setState({
            openDialog: false
        })
    };


    async changeContact(gymId, contact) {

        var token = 'Bearer ' + localStorage.getItem('token')
        await axios({
            method: 'patch',
            url: 'https://api.fettlepool.in/api/gym/'+gymId+'/'+contact+'/changecontact',
            headers: {
                'Authorization': token
            },
            data: {
                scope: "access_gym"
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
        
        var token='Bearer ' + localStorage.getItem('token')
        console.log(token)
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
            });
    }

    async deleteGym(gymId) {
        try {
            this.setState({
                loading: true,
                snackbar: true,
                snackbarMsg: 'Deleting Gym'
            });
            var token = 'Bearer ' + localStorage.getItem('token')
            var res = await axios({
                method: 'patch',
                url: 'https://api.fettlepool.in/api/gym/'+gymId+'/disable',
                headers: {
                    'Authorization': token
                },
                data: {
                    scope: "access_gym"
                }
            });

            if (res.status == 200) {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Gym Deleted Successfully'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                    this.props.history.push('/dashboard');
                }, 1000);
            }
            if (res.status == 400) {
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
                <Sidebar history={this.props.history} />

                <div className="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>

                    <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9', marginBottom: '20px' }}>
                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <div className="row" style={{ justifyContent: 'space-between' }}>
                                <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                                    <i class="mdi mdi-store" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Gyms</h1>
                            </div>
                        </div>

                    </div>

                    {
                        this.state.data.length > 0 ?
                            <div style={{ paddingLeft: '15px', paddingRight: '30px' }}>

                                <div class="equel-grid">
                                    <div class="grid">
                                        <div class="grid-body py-3">
                                            <p class="card-title ml-n1" style={{ fontSize: '24px' }}>Gym Details</p>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-hover table-sm">
                                                <thead>
                                                    <tr class="solid-header">
                                                        <th style={{ background: 'white' }}>Gym Name</th>
                                                        <th style={{ background: 'white' }}>Gym No.</th>
                                                        <th style={{ background: 'white' }}>Locality</th>
                                                        <th style={{ background: 'white' }}>City</th>
                                                        <th style={{ background: 'white' }}>State</th>
                                                        <th style={{ background: 'white' }}>Delete Gym</th>
                                                        <th style={{ background: 'white' }}>Change Contact</th>
                                                    </tr>
                                                </thead>
                                                {this.state.data.map((detail, index) => (
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <small class="text-black font-weight-medium d-block">{detail.name}</small>
                                                            </td>
                                                            <td>{detail.gymNo}</td>
                                                            <td>{detail.locality}</td>
                                                            <td>{detail.city}</td>
                                                            <td>{detail.state}</td>
                                                            <td>
                                                                {
                                                                    this.state.loading == true ?
                                                                        <Button variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold' }}>{<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>}</Button>
                                                                        : <Button onClick={() => this.deleteGym(detail._id)} variant="contained" color="primary" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', fontWeight: 'bold' }}>Delete</Button>
                                                                }
                                                            </td>
                                                            <td><Button onClick={()=> this.openDialogBox(detail._id) } variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>Change Contact</Button></td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <Dialog
                                    open={this.state.openDialog}
                                    fullWidth={true}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle style={{ color: '#00bfb2', fontWeight: 'bolder', fontSize: '24px' }}>Change Gym Contact ?</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            <TextField label="New Mobile No" name="contact" variant="outlined" style={{ width: '90%' }} inputProps={{ style: { fontSize: 19, fontFamily: 'poppins', fontWeight: 'bold' } }} InputLabelProps={{ style: { fontSize: 19, fontFamily: 'poppins' } }} value={this.state.contact} onChange={this.handleChange} />
                                            </DialogContentText>
                                    </DialogContent>
                                    <DialogActions style={{ justifyContent: 'center' }}>
                                        <Button onClick={()=> this.changeContact(this.state.gymId,this.state.contact)} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                                            Submit
                                            </Button>
                                        <Button onClick={this.handleClose} variant="contained" color="primary" style={{ marginRight: '20px', fontWeight: 'bold', backgroundColor: 'white', color: '#00bfb2' }}>
                                            Cancel
                                            </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            : <div></div>
                    }

                </div>
            </div>
        )
    }
}

export default Gyms
