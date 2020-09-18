import React from "react";
import { Link,Redirect,withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            loading: false,
            snackbar: false,
            snackbarMsg: '',
            // redirect:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount(){

    //     if (localStorage.getItem('admin') != null || localStorage.getItem('admin') != ""){
    //         console.log(localStorage.hasOwnProperty('admin'))
    //         console.log(localStorage.getItem('admin')=="")

    //         this.setState({
    //             redirect: true
    //         })
    //     }
        
    // }

    componentDidMount(){
        localStorage.clear();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        const email = this.state.email
        const password = this.state.password
    }

    async login() {
        try {
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'Logging In....'
            });
            var res = await axios({
                method: 'post',
                url: 'https://api.fettlepool.in/api/admin/signin',
                auth: {
                    username: this.state.email,
                    password: this.state.password
                },
            });
            
            if (res.status == 200 && res.data["isConfirmed"]==true) {
                this.setState({
                    snackbar: false
                });
                localStorage.setItem('admin', res.data["email"])
                localStorage.setItem('token', res.data["token"])
                console.log("Pushedddd")
                this.props.history.push('/dashboard');
            }
            else{
                this.setState({
                    loading: false,
                    snackbar: true,
                    snackbarMsg: 'Try Again Later'
                })  
                this.setState({
                    snackbar: false
                });
            }
        }
        catch (err) {
            console.log(err)
            this.setState({
                loading: false,
                snackbar: true,
                snackbarMsg: 'Invalid Credentials'
            })
            setTimeout(() => {
                this.setState({
                    snackbar: false
                });
            }, 2000);
        }
    }

    submitForm(e) {
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.login();
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect
        //         to="/dashboard"
        //         history={this.props.history}
        //     />}
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
                                                <input type="email" className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group input-rounded">
                                                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                            </div>
                                            <div className="form-inline">
                                            </div>
                                                {
                                                    this.state.loading == true ?
                                                        <button type="submit" className="btn  btn-block" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 10%, #028090 74%)', color: 'white', borderRadius: 100, fontSize: 16 }}> {<div style={{paddingTop:5}}><CircularProgress size="30px" style={{color:'white'}}/></div>} </button>
                                                        : <button type="submit" onClick={(e) => this.submitForm(e)} className="btn  btn-block" style={{ backgroundImage: 'linear-gradient(315deg, #00bfb2 0%, #028090 74%)', color: 'white', borderRadius: 100, fontSize: 16 }}> Log In </button>
                                                    }
                                            
                                        </form>
                                        <Link to="/signup"><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingRight: 10 }}><p style={{ color: 'black' }}>Click here to register as a&nbsp;</p><p style={{ color: '#028090', fontWeight: 'bold' }}> Admin </p></div></Link>
                                        <Link to="/superuser"><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingRight: 10 }}><p style={{ color: 'black' }}>Click here to register as a&nbsp;</p><p style={{ color: '#028090', fontWeight: 'bold' }}> Super User </p></div></Link>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auth_footer">
                    <p className="text-muted text-center">© Fettlepool Pvt Ltd | 2019</p>
                </div>
            </div>
            </div>

        )
    }
}

export default withRouter(Login)