import React from "react";

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        const email = this.state.email
        const password = this.state.password
    }

    emailValidator = email => {
        return false
    }

    passwordValidator = password => {
        
        return false
    }

    render(){
        return (
            <div className="authentication-theme auth-style_1">
        <div className="row">
            <div className="col-12 logo-section">
            <a href="%PUBLIC_URL%/index.html" className="logo">
                <img src="/assets/images/logo.svg" alt="logo" />
            </a>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-5 col-md-7 col-sm-9 col-11 mx-auto">
            <div className="grid">
                <div className="grid-body">
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
                        <button type="submit" className="btn btn-primary btn-block"> Login </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="auth_footer">
            <p className="text-muted text-center">© Fettlepool | 2019</p>
        </div>
      </div>
        )
    }
}

export default LoginForm