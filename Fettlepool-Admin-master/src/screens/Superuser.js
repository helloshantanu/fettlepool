import React from "react";
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class Superuser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            mobile: "",
            email: "",
            password: "",
            pin: "",
            confirmPassword: "",
            loading: false,
            snackbar: false,
            snackbarMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        const name = this.state.name
        const mobile = this.state.mobile
        const email = this.state.email
        const password = this.state.password
        const pin = this.state.pin
    }

    async signup() {
        try {
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'Registering....'
            })
            var res = await axios.post('https://api.fettlepool.in/api/admin/superuser', {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                mobile: this.state.mobile,
                pin: this.state.pin
            })
            if (res.status == 200) {
                this.setState({
                    snackbar: false
                });
                this.props.history.push('/login')
            }
        }
        catch (err) {
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: ' :( Try Again Later...'
            })
            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 2500);
        }
    }

    submitForm(e) {
        e.preventDefault();
        if (this.state.email == "" || this.state.name == "" || this.state.password == "" || this.state.mobile == "" || this.state.confirmPassword == ""|| this.state.pin=="") {
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'All fields are Mandatory'
            });
            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 2000);
        }
        else {
            if (this.state.password == this.state.confirmPassword) {
                this.setState({
                    loading: true
                })
                this.signup();
            }
            else {
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Passwords not matched'
                });
                setTimeout(() => {
                    this.setState({
                        snackbar: false
                    });
                }, 2000);
            }
        }

    }


    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbar}
                    message={<span style={{ textAlign: 'center' }}>{this.state.snackbarMsg}</span>}
                />
                <div className="authentication-theme auth-style_1">

                    <div className="row">
                        <div className="col-lg-5 col-md-7 col-sm-9 col-11 mx-auto">

                            <div className="grid">

                                <div className="grid-body">
                                    <div className="col-12 logo-section">
                                        <a href="#" className="logo">
                                            <img src="/assets/images/signup.png" alt="logo" />
                                        </a>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-7 col-md-8 col-sm-9 col-12 mx-auto form-wrapper">
                                            <form action="#">
                                                <div className="form-group input-rounded">
                                                    <input type="name" className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group input-rounded">
                                                    <input type="email" className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group input-rounded">
                                                    <input type="text" className="form-control" name="mobile" placeholder="Mobile No." value={this.state.mobile} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group input-rounded">
                                                    <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group input-rounded">
                                                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-group input-rounded">
                                                    <input type="password" className="form-control" name="pin" placeholder="High Securtiy Pin" value={this.state.pin} onChange={this.handleChange} />
                                                </div>
                                                <div className="form-inline">
                                                </div>
                                                {
                                                    this.state.loading == true ?
                                                        <button type="submit" className="btn  btn-block" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 10%, #028090 74%)', color: 'white', borderRadius: 100, fontSize: 16 }}> {<div style={{ paddingTop: 5 }}><CircularProgress size="30px" style={{ color: 'white' }} /></div>} </button>
                                                        : <button type="submit" onClick={(e) => this.submitForm(e)} className="btn  btn-block" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', color: 'white', borderRadius: 100, fontSize: 16 }}> Register as Super User </button>
                                                }
                                            </form>

                                            <Link to="/signup"><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingRight: 10 }}><p style={{ color: 'black' }}>Click here to register as a&nbsp;</p><p style={{ color: '#028090', fontWeight: 'bold' }}> Admin </p></div></Link>
                                            <Link to="/login"><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 5, paddingRight: 10 }}><p style={{ color: 'black' }}>Click here to&nbsp;</p><p style={{ color: '#028090', fontWeight: 'bold' }}> Log In </p></div></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auth_footer">
                        <p className="text-muted text-center">© Fettlepool Pvt Ltd | {(new Date().getFullYear())}</p>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Superuser